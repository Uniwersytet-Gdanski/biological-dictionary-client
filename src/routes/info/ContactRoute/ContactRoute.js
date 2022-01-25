import { Helmet } from 'react-helmet-async';
import HeaderWithoutSearch from '../../../components/HeaderWithoutSearch/HeaderWithoutSearch';
import styles from './ContactRoute.module.css'

const ContactRoute = () => {
  return (
    <div className={styles.route}>
      <Helmet>
        <title> O słowniku - Słownik Biologiczny </title>
      </Helmet>
      <HeaderWithoutSearch />

      <div className={styles.main}>
        <h1 className={styles.title}>Kontakt</h1>
        <p className={styles.contact}>
          Kontakt z autorami dostępny mailowo: 
          <a className={styles.email} href='mailto:slownikbiologia@gmail.com'>slownikbiologia@gmail.com</a>
        </p>
        <p className={styles.contact}>
          <a href='https://forms.gle/ZFwLMs7FxL1RBT9A8'>Zgłoś błąd / zaproponuj nowy termin </a>
        </p>
      </div>
    </div>
  );
};

export default ContactRoute;
