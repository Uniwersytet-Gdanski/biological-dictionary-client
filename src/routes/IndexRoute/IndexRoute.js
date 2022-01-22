import styles from './IndexRoute.module.css';
import Header from '../../components/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Index from '../../components/Index/Index';
import { useEffect } from 'react';

const IndexRoute = () => {
  const navigate = useNavigate();

  const { letter } = useParams();
  useEffect(() => {
    if (letter.length !== 1) {
      navigate("/", true);
      return;
    }
    if (letter.toLowerCase() !== letter) {
      navigate(`/index/${letter.toLowerCase()}`, true);
    }
  }, [letter, navigate]);


  return (
    <div className={styles.index}>
      <Helmet>
        <title>{letter} - indeks - Słownik Biologiczny</title>
      </Helmet>
      <Header currentLetter={letter} />
      <div className={styles.mainContainer}>
        <main className={styles.main}>
          <h1>Hasła na literę {letter}</h1>
          <Index letter={letter} />
        </main>
      </div>
    </div>
  );
};

export default IndexRoute;
