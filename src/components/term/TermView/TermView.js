import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import poland from '../../../img/poland.png';
import uk from '../../../img/uk.png';
import { markTermIdAsNonexistent } from '../../../redux/slices/terms';
import { getUser } from '../../../redux/slices/user';
import styles from './TermView.module.css'

const TermView = ({ term, areNamesLinks }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const user = useSelector(getUser);

  const handleDeleteClick = () => {
    axiosClient.delete(`/terms/${term.id}`).then(() => {
      dispatch(markTermIdAsNonexistent(term.id));
      setError(null);
      navigate('/');
    }).catch((error) => {
      if (error.isAxiosError) {
        if (error.response.status === 401) {
          setError("Nie masz uprawnień do usuwania tego terminu");
        } else if (error.response.status === 404) {
          setError("Nie znaleziono takiego terminu, być może został już usunięty");
        } else {
          setError("Wystąpił błąd sieci");
          console.log(error);
        }
      } else {
        setError("Wystąpił błąd");
        console.log(error);
      }
    });
  };

  const TermName = ({ children }) => {
    return areNamesLinks ? (
      <Link to={`/term/${term.id}`}>{children}</Link>
    ) : (
      children
    );
  };

  return (
    <>
      <div className={styles.languageGrid}>
        <img src={poland} alt={'polskie nazwy'} />
        <div className={styles.polishSection}>
          <h1 className={styles.termSingularText}>
            <TermName>{term.names[0]}</TermName>
          </h1>
          {term.names.slice(1).map(name => (
            <div
              key={name}
              className={styles.termSingularText}
            >
              <TermName>{name}</TermName>
            </div>
          ))}
        </div>
        <img src={uk} alt={'angielskie tłumaczenia'} />
        <div className={styles.englishSection}>
          {term.englishTranslations.map(englishTranslation => (
            <Fragment key={englishTranslation.singular + "|" + englishTranslation.plural}>
              <div
                className={styles.termSingularText}
              >
                {englishTranslation.singular || "–"}
              </div>
              <div
                className={styles.termPluralText}
              >
                lm. {englishTranslation.plural || "–"}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div className={styles.definition}>
        {term.definition}
      </div>
      {user && (
        <section className={styles.adminSection}>
          <p>
            <Link to={`/term/${term.id}/edit`}>
              Edytuj
            </Link>
            <button onClick={handleDeleteClick}>
              Usuń
            </button>
            
          </p>
          <div className={styles.warning}>{error}</div>
        </section>
      )}
    </>
  )
};

export default TermView;
