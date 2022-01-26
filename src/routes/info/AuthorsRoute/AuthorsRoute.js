import { Helmet } from 'react-helmet-async';
import HeaderWithoutSearch from '../../../components/HeaderWithoutSearch/HeaderWithoutSearch';
import styles from './AuthorsRoute.module.css'

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
          Polsko-angielski słownik terminów biologicznych, pierwszy tego typu słownik w Polsce, został przygotowany przez 
          następujących studentów Genetyki i Biologii Eksperymentalnej z Wydziału Biologii Uniwersytetu Gdańskiego:
          <ul>
            <li>Kacpra Boguszewskiego</li>
            <li>Katarzynę Bryszkowską</li>
            <li>Aleksandrę Kujałowicz</li>
            <li>Marcina Banackiego</li>
            <li>Huberta Czyża</li>
            <li>Annę Barczak</li>
          </ul>
          Pod opieką mgr Barbary Kubicy-Daniel z Centrum Języków Obcych Uniwersytetu Gdańskiego.
        </div>
        <div>
          Za przygotowanie strony internetowej odpowiedzialny jest zespół studentów Wydziału Matematyki, Fizyki i Informatyki 
          pod opieką dr Hanny Furmańskiej i mgr Wojciecha Łojkowskiego w składzie:
          <ul>
            <li>Rafał Majewski</li>
            <li>Mikołaj Lomiak</li>
            <li>Sandra Leman</li>
          </ul>
          Za opracowanie interfejsu odpowiedzialna jest Joanna Jaworska, studentka studiów magisterskich 
          z Wydziału Nauk Społecznych Uniwersytetu Gdańskiego.
        </div>
      </div>
    </div>
  );
};

export default AuthorsRoute;
