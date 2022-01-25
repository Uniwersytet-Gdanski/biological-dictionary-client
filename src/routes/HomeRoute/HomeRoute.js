import { Helmet } from 'react-helmet-async';
import HeaderWithSearch from '../../components/HeaderWithSearch/HeaderWithSearch';
import styles from './HomeRoute.module.css'

const HomeRoute = () => {
  return (
    <div className={styles.route}>
      <Helmet>
        <title>Słownik Biologiczny</title>
      </Helmet>
      <HeaderWithSearch />
    </div>
  );
};

export default HomeRoute;
