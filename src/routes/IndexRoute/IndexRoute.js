import styles from './IndexRoute.module.css';
import Header from '../../components/Header/Header';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import Index from '../../components/Index/Index';

const IndexRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // TODO define what happens if someone uses a capital letter in the url
  const {letter} = useParams();

  // if (letter.length !== 1) {
  //   navigate("/"); // not worth making a custom error for a 404 like this
  //   return;
  // }

  return (
      <div className={styles.index}>
        <Helmet>
          <title>{letter} - indeks - Słownik Biologiczny</title>
        </Helmet>
        <Header currentLetter={letter} />
        <div className={styles.mainContainer}>
          <main className={styles.main}>
            <h1>Hasła na literę {letter}</h1>
            <Index letter={letter}/>
          </main>
        </div>
      </div>
  );
};

export default IndexRoute;
