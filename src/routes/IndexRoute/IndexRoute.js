import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderWithSearch from '../../components/HeaderWithSearch/HeaderWithSearch';
import Index from '../../components/Index/Index';
import styles from './IndexRoute.module.css';

const IndexRoute = () => {
  const navigate = useNavigate();

  const { letter } = useParams();
  useEffect(() => {
    if (letter.length !== 1) {
      navigate("/", { replace: true });
      return;
    }
    if (letter.toLowerCase() !== letter) {
      navigate(`/index/${letter.toLowerCase()}`, { replace: true });
    }
  }, [letter, navigate]);

  return (
    <div className={styles.route}>
      <Helmet>
        <title>{letter} - indeks - Słownik Biologiczny</title>
      </Helmet>
      <HeaderWithSearch currentLetter={letter} />
      <main className={styles.main}>
        <h1>Hasła na literę {letter}</h1>
        <Index letter={letter} />
      </main>
    </div>
  );
};

export default IndexRoute;
