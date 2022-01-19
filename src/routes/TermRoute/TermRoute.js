import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {Fragment, useEffect, useState} from 'react';
import axiosClient from '../../axiosClient';
import Header from '../../components/Header/Header';
import styles from './TermRoute.module.css';
import poland from '../../poland.png';
import uk from '../../uk.png';

const TermRoute = () => {
  const {termCode} = useParams();

  const [term, setTerm] = useState(null);

  useEffect(() => {
    axiosClient.get(`/entries/${termCode}`).then(response => {
      setTerm(response.data);
    }).catch(ex => {
      if (ex.isAxiosError) {
        // TODO
      }
        console.log(ex);
    });
  }, [termCode]);

  return (
      <div className={styles.route}>
        <Helmet>
          <title>
            {term?.names[0] || termCode} - Słownik Biologiczny
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
                      {term.englishTerms.map((englishTerm, i) => (
                          <Fragment key={englishTerm.singular}>
                            <div
                                className={styles.termSingularText}
                            >
                              {englishTerm.singular}
                            </div>
                            <div
                                className={styles.termPluralText}
                            >
                                  lm. {englishTerm.plural || "–"}
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
            {!term && 'Ładowanie...'}
          </main>
        </div>
      </div>
  );
};

export default TermRoute;
