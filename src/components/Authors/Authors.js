import { Link } from 'react-router-dom';
import logo from '../../img/logo.png'
import NavBar from '../NavBar/NavBar';
import styles from './Authors.module.css'

const Authors = () => {

  return (
    <header className={styles.about}>
      <NavBar />
      <h1 className={styles.title}>Polsko-Angielski Słownik Biologiczny</h1>
      <Link to="/" className={styles.logoContainer}>
        <img src={logo} alt="Logo" />
      </Link>

      <h1 className={styles.title}>Autorzy</h1>

      <div className={styles.mainContainer}>
        <main className={styles.main}>
          <p>
            Polsko-angielski słownik terminów biologicznych, pierwszy tego typu słownik w Polsce, został przygotowany przez 
            następujących studentów Genetyki i Biologii Eksperymentalnej z Wydziału Biologii Uniwersytetu Gdańskiego:
            <ul>
              <li>Marcina Banackiego</li>
              <li>Annę Barczak</li>
              <li>Katarzynę Bryszkowską</li>
              <li>Kacpra Boguszewskiego</li>
              <li>Huberta Czyża</li>
              <li>Aleksandrę Kujałowicz</li>
            </ul>
            Pod opieką mgr Barbary Kubicy-Daniel z Centrum Języków Obcych Uniwersytetu Gdańskiego.
          </p>
          <p>
            Za przygotowanie strony internetowej odpowiedzialny jest zespół studentów Wydziału Matematyki, Fizyki i Informatyki 
            pod opieką dr Hanny Furmańskiej i mgr Wojciecha Łojkowskiego w składzie:
            <ul>
              <li>Rafał Majewski</li>
              <li>Mikołaj Lomiak</li>
              <li>Sandra Leman</li>
            </ul>
            Za opracowanie interfejsu odpowiedzialna jest Joanna Jaworska, studentka studiów magisterskich 
            z Wydziału Nauk Społecznych Uniwersytetu Gdańskiego.
          </p>
        </main>
      </div>
    </header>
  )
};

export default Authors;
