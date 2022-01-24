import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './NotFoundRoute.module.css';

const NotFoundRoute = () => {
  const location = useLocation();

  return (
    <div className={styles.route}>
      <Helmet>
        <title>404 Nie znaleziono - Słownik Biologiczny</title> {/* TODO replace with name */}
      </Helmet>
      <Header />
      <main className={styles.main}>
        <h1>404 Nie ma takiej strony - {location.pathname}</h1>
        <p>
          <Link to="/">
            Przejdź do strony głównej
          </Link> lub wyszukaj w polu wyżej
          </p>
        </main>
    </div>
  );
};

export default NotFoundRoute;
