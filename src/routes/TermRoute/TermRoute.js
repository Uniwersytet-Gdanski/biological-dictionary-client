import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import HeaderWithSearch from '../../components/HeaderWithSearch/HeaderWithSearch';
import { addTerm, getTermById, markTermIdAsNonexistent } from '../../redux/slices/terms';
import styles from './TermRoute.module.css';

const TermRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { termId } = useParams();

  const [searchParams] = useSearchParams();

  const queryParam = searchParams.get('q');
  const [savedQuery, setSavedQuery] = useState();

  const term = useSelector(getTermById(termId));
  // undefined - not yet loaded
  // null - does not exist in the database
  // object - loaded

  useEffect(() => {
    if (queryParam) {
      setSavedQuery(queryParam);
      // navigate to the same URL without the query ?q=...
      navigate(document.location.pathname, { replace: true });
    } else if (!savedQuery && term) {
      setSavedQuery(term.names[0]);
    }
  }, [queryParam, term, navigate, savedQuery]);

  const [error, setError] = useState(null);


  useEffect(() => {
    axiosClient.get(`/terms/${termId}`).then((response) => {
      dispatch(addTerm(response.data));
      setError(null);
    }).catch((error) => {
      if (error.isAxiosError) {
        if (error.response && error.response.status === 404){
          setError(null);
          dispatch(markTermIdAsNonexistent(termId));
          console.log(error);
          return;
        } else {
          setError("Wystąpił błąd sieci")
          console.log(error);
        }
      } else {
        setError("Wystąpił błąd");
        console.log(error);
      }
    });
  }, [dispatch, termId]);

  return (
    <div className={styles.route}>
      <Helmet>
        <title>
          {term?.names[0] || savedQuery || termId} - Słownik Biologiczny
        </title>
      </Helmet>
      <HeaderWithSearch initialQuery={savedQuery} />
      <main className={styles.main}>
        {term && (
          <Outlet context={[termId, term, savedQuery]} />
        )}
        {term === null && !error && <div className={styles.warning}>Nie ma takiego słówka</div>}
        {term === undefined && !error && <div className={styles.warning}>Ładowanie...</div>}
        {error && <div className={styles.warning}>{error}</div>}
      </main>
    </div>
  );
};

export default TermRoute;
