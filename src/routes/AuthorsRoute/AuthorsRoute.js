import { Helmet } from 'react-helmet-async';
import Authors from '../../components/Authors/Authors';
import styles from './AuthorsRoute.module.css'

const AuthorsRoute = () => {
  return (
    <div className={styles.route}>
      <Helmet>
        <title> O słowniku - Słownik Biologiczny </title>
      </Helmet>
      <Authors />
    </div>
  );
};

export default AuthorsRoute;
