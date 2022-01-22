import styles from './Header.module.css'
import NavBar from '../NavBar/NavBar';

import logo from '../../img/logo.png'
import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Header = ({ currentLetter = null }) => {
  const [letters, setLetters] = useState(null);
  const [, setAreLettersLoading] = useState(true);
  const [, setLettersLoadingError] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_API_URL}/terms-first-letters`).then(response => {
        setLetters(response.data);
    }).catch(ex => {
        setLettersLoadingError(ex);
    }).finally(() => {
        setAreLettersLoading(false);
    });
  }, []);

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
        {letters?.map(letter => (
          <Link
            to={`/index/${letter}`}
            key={letter}
            className={
              classNames({[styles.letter]: true, [styles.activeLetter]: letter === currentLetter })
            }
          >
            {letter.toUpperCase()}
          </Link>
        )) || Array(30).fill().map((_, i) => (
          <div key={i} className={classNames({[styles.letter]: true })}>&nbsp;</div>
        ))}
      </section>
    </header>
  )
}

export default Header;
