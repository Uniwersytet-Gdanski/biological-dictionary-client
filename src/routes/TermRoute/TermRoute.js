import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {Fragment, useEffect, useState} from 'react';
import axiosClient from '../../axiosClient';
import Header from '../../components/Header/Header';
import styles from './TermRoute.module.css';
import poland from '../../img/poland.png';
import uk from '../../img/uk.png';
import {useSelector, useDispatch} from 'react-redux';
import {addTerm, markTermIdAsNonexisting, getTermById} from '../../redux/slices/terms';



const TermRoute = () => {
  const dispatch = useDispatch();
  const {termId} = useParams();

  const term = useSelector(getTermById(termId));
  // undefined - not yet loaded
  // null - does not exist in the database
  // object - loaded

  const [error, setError] = useState(undefined);


	useEffect(() => {

		if (term === undefined) {
			axiosClient.get(`/terms/${termId}`).then((response) => {
				dispatch(addTerm(response.data));
				setError(null);
			}).catch((error) => {
				if (error.isAxiosError && error.response.status === 404) {
					setError(null);
					dispatch(markTermIdAsNonexisting(termId));
					console.log('term not found');
					return;
				}
				setError(error);

			});
		}
	}, [term, dispatch, termId]);

  return (
      <div className={styles.route}>
        <Helmet>
          <title>
            {term?.names[0] || termId} - Słownik Biologiczny
          </title>
        </Helmet>
        <Header />
        <div className={styles.mainContainer}>
          <main className={styles.main}>
            {term && (
                <>
                  <div className={styles.languageGrid}>
                    <img src={poland} alt={'polskie nazwy'} />
                    <div className={styles.polishSection}>
                      <h1 className={styles.termSingularText}>{term.names[0]}</h1>
                      {term.names.slice(1).map(name => (
                          <div
                              key={name}
                              className={styles.termSingularText}
                          >
                            {name}
                          </div>
                      ))}
                    </div>
                    <img src={uk} alt={'angielskie tłumaczenia'} />
                    <div className={styles.englishSection}>
                      {term.englishTranslations.map((englishTranslation, i) => (
                          <Fragment key={englishTranslation.singular}>
                            <div
                                className={styles.termSingularText}
                            >
                              {englishTranslation.singular}
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
                </>
            )}
			{term === null && !error && 'Nie ma takiego słówka'}
            {term === undefined && !error && 'Ładowanie...'}
			{error && 'Błąd:' + error}
          </main>
        </div>
      </div>
  );
};


export default TermRoute;
