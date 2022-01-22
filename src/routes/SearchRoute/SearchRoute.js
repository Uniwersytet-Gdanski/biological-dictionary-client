import {useSearchParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {useEffect, useState} from 'react';
import axiosClient from '../../axiosClient';
import Header from '../../components/Header/Header';
import styles from './SearchRoute.module.css';
import Term from '../../components/Term/Term';

const SearchRoute = () => {
  const {query} = useSearchParams();

  const [foundTerms, setFoundTerms] = useState(null);

  console.log(foundTerms);

  // TODO Redux

  useEffect(() => {
    axiosClient.get(`/search-entries?query=${encodeURIComponent(query)}`)
        .then(response => {
          setFoundTerms(response.data.data);
        })
        .catch(ex => {
          if (ex.isAxiosError) {
            // TODO
          }
          console.log(ex);
        });
  }, [query]);

  return (
      <div className={styles.route}>
        <Helmet>
          <title>
            123 - wyszukaj - Słownik Biologiczny
          </title>
        </Helmet>
        <Header />
        <div className={styles.mainContainer}>
          <main className={styles.main}>
            {query}
            {foundTerms && (foundTerms.map(term => (
                <Term term={term} />
            )))}
            {!foundTerms && 'Ładowanie...'}
          </main>
        </div>
      </div>
  );
};

export default SearchRoute;
