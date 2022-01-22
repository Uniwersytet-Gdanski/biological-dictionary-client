import classNames from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import logo from '../../img/logo.png'
import {
  getTermsFirstLettersState,
  setErrorTermsFirstLetters,
  setTermsFirstLetters
} from '../../redux/slices/termsFirstLetters';
import NavBar from '../NavBar/NavBar';
import Search from '../Search/Search';
import styles from './Header.module.css'

const Header = ({ currentLetter = null }) => {
  const dispatch = useDispatch();
  const {
    data: letters,
    // error,  // todo: error handling
    // isLoading,  // todo: loading indicator
  } = useSelector(getTermsFirstLettersState);
  useEffect(() => {
    axiosClient.get(`/terms-first-letters`).then(response => {
      dispatch(setTermsFirstLetters(response.data));
    }).catch(ex => {
      dispatch(setErrorTermsFirstLetters(ex));
    });
  }, [dispatch]);

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
              classNames({ [styles.letter]: true, [styles.activeLetter]: letter === currentLetter })
            }
          >
            {letter.toUpperCase()}
          </Link>
        )) || Array(30).fill().map((_, i) => (
          <div key={i} className={classNames({ [styles.letter]: true })}>&nbsp;</div>
        ))}
      </section>
    </header>
  )
};

export default Header;
