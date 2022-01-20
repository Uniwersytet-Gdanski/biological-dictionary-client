import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {Fragment, useEffect, useState} from 'react';
import axiosClient from '../../axiosClient';
import Header from '../../components/Header/Header';
import styles from './TermRoute.module.css';
import poland from '../../poland.png';
import uk from '../../uk.png';
import {useSelector} from 'react-redux';
import {getEntryById} from '../../ducks/entries/selectors';
import {connect} from 'react-redux';
import entryOperations from '../../ducks/entries/operations.js';



const TermRoute = ({addEntry, markEntryIdAsNonexisting}) => {
  const {termCode} = useParams();

  const term = useSelector((state) => (getEntryById(state, termCode)));
  const [error, setError] = useState(undefined);

//   useEffect(() => {
//     axiosClient.get(`/entries/${termCode}`).then(response => {
//       setTerm(response.data);
//     }).catch(ex => {
//       if (ex.isAxiosError) {
//         // TODO
//       }
//         console.log(ex);
//     });
//   }, [termCode]);
	console.log(term);

	useEffect(() => {
		
		if (term === undefined) {
			axiosClient.get(`/entries/${termCode}`).then((response) => {
				addEntry(response.data);
				setError(null);
			}).catch((error) => {
				if (error.isAxiosError && error.response.status === 404) {
					setError(null);
					markEntryIdAsNonexisting(termCode);
					console.log('entry not found');
					return;
				}
				setError(error);
				
			});
		}
	}, [term, addEntry, termCode, markEntryIdAsNonexisting]);

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
			{term === null && !error && 'Nie ma takiego słówka'}
            {term === undefined && !error && 'Ładowanie...'}
			{error && 'Błąd'}
          </main>
        </div>
      </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
	  addEntry: (entry) => dispatch(entryOperations.addEntry(entry)),
	  markEntryIdAsNonexisting: (entryId) => dispatch(entryOperations.markEntryIdAsNonexisting(entryId)),
});


export default connect(null, mapDispatchToProps)(TermRoute);
