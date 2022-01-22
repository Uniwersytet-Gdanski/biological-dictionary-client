import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import axiosClient from '../../axiosClient';
import Header from '../../components/Header/Header';
import styles from './TermRoute.module.css';
import Term from '../../components/Term/Term';
import { useDispatch, useSelector } from 'react-redux';
import { addTerm, getTermById, markTermIdAsNonexisting } from '../../redux/slices/terms';

const TermRoute = () => {
  const dispatch = useDispatch();
  const { termId } = useParams();

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
            <Term term={term} />
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
