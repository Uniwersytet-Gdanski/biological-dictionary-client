import { Helmet } from 'react-helmet-async';
import HeaderWithSearch from '../../components/HeaderWithSearch/HeaderWithSearch';
import TermForm from '../../components/term/TermForm/TermForm';
import styles from './AddTermRoute.module.css';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/user';

const AddTermRoute = () => {
  const user = useSelector(getUser);

  return (
    <div className={styles.route}>
      <Helmet>
        <title>
          dodaj słówko - Słownik Biologiczny
        </title>
      </Helmet>
      <HeaderWithSearch />
      <main className={styles.main}>
        { user ? <TermForm /> : <h2 className={styles.warning}> Musisz być zalogowany. </h2>}
      </main>
    </div>
  );
};

export default AddTermRoute;
