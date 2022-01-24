import { Helmet } from 'react-helmet-async';
import Header from '../../components/Header/Header';
import styles from './HomeRoute.module.css'

const HomeRoute = () => {
  return (
    <div className={styles.route}>
      <Helmet>
        <title>Słownik Biologiczny</title>
      </Helmet>
      <Header />
    </div>
  );
};

export default HomeRoute;
