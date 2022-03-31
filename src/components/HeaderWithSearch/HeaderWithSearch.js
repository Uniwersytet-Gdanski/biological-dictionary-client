import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import {
  getTermsFirstLettersState,
  setErrorTermsFirstLetters,
  setTermsFirstLetters
} from '../../redux/slices/termsFirstLetters';
import HeaderBranding from '../HeaderBranding/HeaderBranding';
import NavBar from '../NavBar/NavBar';
import Search from '../Search/Search';
import styles from './HeaderWithSearch.module.css'

const HeaderWithSearch = ({ currentLetter, initialQuery }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const {
    data: letters,
    // error,  // todo: error handling
    // isLoading,  // todo: loading indicator
  } = useSelector(getTermsFirstLettersState);
  useEffect(() => {
    axiosClient.get(`/terms-first-letters`).then(response => {
      dispatch(setTermsFirstLetters(response.data));
    }).catch(ex => {
      console.log(ex);
      setError("Wystąpił błąd sieci");
      dispatch(setErrorTermsFirstLetters(ex));
    });
  }, [dispatch]);

  return (
    <header>
      <NavBar />
      <HeaderBranding />
      <div className={styles.searchContainer}>
        <Search initialQuery={initialQuery} />
      </div>
      {!error && <section className={styles.letters}>
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
      </section>}
      {error && <div className={styles.warning}>{error}</div>}
    </header>
  )
};

export default HeaderWithSearch;
