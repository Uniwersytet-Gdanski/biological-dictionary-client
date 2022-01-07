import styles from './HomeRoute.module.css'
import Header from '../../components/Header/Header';
import {Helmet} from 'react-helmet-async';

const HomeRoute = () => {
  return (
    <div className={styles.home}>
      <Helmet>
        <title>Słownik Biologiczny</title>
      </Helmet>
      <Header />
    </div>
  );
};

export default HomeRoute;
