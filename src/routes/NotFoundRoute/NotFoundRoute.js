import styles from './NotFoundRoute.module.css';
import Header from '../../components/Header/Header';
import {Link, useLocation} from 'react-router-dom';
import {Helmet} from 'react-helmet';

const NotFoundRoute = () => {
  const location = useLocation();

  return (
      <div className={styles.notFound}>
        <Helmet>
          <title>404 Nie znaleziono - Słownik Biologiczny</title> {/* TODO replace with name */}
        </Helmet>
        <Header />
        <div className={styles.mainContainer}>
          <main className={styles.main}>
            <h1>404 Nie ma takiej strony - {location.pathname}</h1>
            <p>
              <Link to="/">
                Przejdź do strony głównej
              </Link> lub wyszukaj w polu wyżej
            </p>
          </main>
        </div>
      </div>
  );
};

export default NotFoundRoute;
