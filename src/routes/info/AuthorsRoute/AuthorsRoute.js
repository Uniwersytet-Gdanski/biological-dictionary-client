import { Helmet } from 'react-helmet-async';
import HeaderWithoutSearch from '../../../components/HeaderWithoutSearch/HeaderWithoutSearch';
import styles from './AuthorsRoute.module.css'
import authorsImg from '../../../img/authors.png'


const AuthorsRoute = () => {
  return (
    <div className={styles.route}>
      <Helmet>
        <title> O słowniku - Słownik Biologiczny </title>
      </Helmet>
      <HeaderWithoutSearch />

      <div className={styles.main}>
        <h1 className={styles.title}>Autorzy</h1>
        <div>
			<img src={authorsImg} alt="Autorzy" className={styles.authorsImg} />
          Polsko-angielski słownik terminów biologicznych, pierwszy tego typu słownik w Polsce, został przygotowany przez
          następujących studentów Genetyki i Biologii Eksperymentalnej z Wydziału Biologii Uniwersytetu Gdańskiego:
          <ul>
            <li>Marcina Banackiego</li>
            <li>Annę Barczak</li>
            <li>Kacpra Boguszewskiego</li>
            <li>Katarzynę Bryszkowską</li>
            <li>Huberta Czyża</li>
            <li>Aleksandrę Kujałowicz</li>
          </ul>
          Pod opieką mgr Barbary Kubicy-Daniel z Centrum Języków Obcych Uniwersytetu Gdańskiego.
        </div>
        <div>
          Za przygotowanie strony internetowej odpowiedzialny jest zespół studentów Wydziału Matematyki, Fizyki i Informatyki
          pod opieką dr Hanny Furmańczyk i mgr Wojciecha Łojkowskiego w składzie:
          <ul>
            <li>Sandra Leman</li>
            <li>Mikołaj Lomiak</li>
            <li>Rafał Majewski</li>
          </ul>
          Za opracowanie interfejsu odpowiedzialna jest Joanna Jaworska, studentka studiów magisterskich
          z Wydziału Nauk Społecznych Uniwersytetu Gdańskiego.
        </div>
      </div>
    </div>
  );
};

export default AuthorsRoute;
