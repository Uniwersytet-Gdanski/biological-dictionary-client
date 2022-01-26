import { Helmet } from 'react-helmet-async';
import HeaderWithSearch from '../../components/HeaderWithSearch/HeaderWithSearch';
import TermForm from '../../components/term/TermForm/TermForm';
import styles from './AddTermRoute.module.css';

const AddTermRoute = () => {
  return (
    <div className={styles.route}>
      <Helmet>
        <title>
          dodaj słówko - Słownik Biologiczny
        </title>
      </Helmet>
      <HeaderWithSearch />
      <main className={styles.main}>
        <TermForm />
      </main>
    </div>
  );
};

export default AddTermRoute;
