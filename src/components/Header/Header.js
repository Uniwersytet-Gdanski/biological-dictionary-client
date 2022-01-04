import styles from './Header.module.css'
import NavBar from '../NavBar/NavBar';

import logo from '../../logo.png'
import Search from '../Search/Search';

const Header = () => {
  return (
    <header>
      <NavBar />
      <h1 className={styles.title}>Polsko-Angielski Słownik Biologiczny</h1>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.searchContainer}>
        <Search />
      </div>
    </header>
  )
}

export default Header;
