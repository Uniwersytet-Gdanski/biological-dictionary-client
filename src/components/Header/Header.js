import styles from './Header.module.css'
import NavBar from '../NavBar/NavBar';

import logo from '../../logo.jpg'
import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const Header = ({ currentLetter }) => {
  const letters = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  const currentUppercaseLetter = currentLetter?.toUpperCase();

  return (
    <header className={styles.header}>
      <NavBar />
      <h1 className={styles.title}>Polsko-Angielski Słownik Biologiczny</h1>
      <Link to="/" className={styles.logoContainer}>
        <img src={logo} alt="Logo" />
      </Link>
      <div className={styles.searchContainer}>
        <Search />
      </div>
      <section className={styles.letters}>
        {letters.map(letter => (
          <Link
            to={`/index/${letter.toLowerCase()}`}
            key={letter}
            className={
              classNames({ [styles.activeLetter]: letter === currentUppercaseLetter })
            }
          >
            {letter}
          </Link>
        ))}
      </section>
    </header>
  )
}

export default Header;
