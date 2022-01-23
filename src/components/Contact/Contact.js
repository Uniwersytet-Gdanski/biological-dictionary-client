import { Link } from 'react-router-dom';
import logo from '../../img/logo.png'
import NavBar from '../NavBar/NavBar';
import styles from './Contact.module.css'

const Contact = () => {

  return (
    <header className={styles.about}>
      <NavBar />
      <h1 className={styles.title}>Polsko-Angielski Słownik Biologiczny</h1>
      <Link to="/" className={styles.logoContainer}>
        <img src={logo} alt="Logo" />
      </Link>

      <h1 className={styles.title}>Kontakt</h1>

      <div className={styles.mainContainer}>
        <main className={styles.main}>
          <p>
            Kontakt z autorami dostępny mailowo: slownikbiologia@gmail.com
          </p>
          <p>
            <a href='https://forms.gle/ZFwLMs7FxL1RBT9A8'>Zgłoś błąd / zaproponuj nowy termin </a>
          </p>
        </main>
      </div>
    </header>
  )
};

export default Contact;
