import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import Header from '../../components/Header/Header';
import Term from '../../components/Term/Term';
import { addTerm } from '../../redux/slices/terms';
import styles from './SearchRoute.module.css';

const SearchRoute = () => {
  // TODO Redux is weird
  const [searchParams] = useSearchParams();

  const query = searchParams.get('q');

  const dispatch = useDispatch();

  const [foundTerms, setFoundTerms] = useState(null);

  console.log(foundTerms);

  useEffect(() => {
    axiosClient.get(`/search-terms`, {
      params: {
        query: query,
        withFullTerms: true,
      },
    }).then(response => {
      const terms = response.data.data.map(it => it.term);
      terms.forEach(term => dispatch(addTerm(term)));
      setFoundTerms(terms);
    }).catch(ex => {
      if (ex.isAxiosError) {
        // TODO
      }
      console.log(ex);
    });
  }, [query, dispatch]);

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
          <h1>Wyniki wyszukiwania {query}</h1>
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
