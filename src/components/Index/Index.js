import classNames from 'classnames/bind';
import { useCallback, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axiosClient from '../../axiosClient';
import { addTerms } from '../../redux/slices/terms';
import styles from './Index.module.css';

const Index = ({ letter }) => {
  const dispatch = useDispatch();

  const [termsWithDetails, setTermsWithDetails] = useState([]);
  const [hasMoreTerms, setHasMoreTerms] = useState(true);
  const [nextPageNumber, setNextPageNumber] = useState(1);

  const fetchMoreTerms = useCallback(
    (pageNumberToFetch) => {
      axiosClient.get(`/terms-by-prefix`, {
        params: {
          prefix: letter,
          pageNumber: pageNumberToFetch,
          withFullTerms: true,
          pageSize: 50
        },
      }).then(response => {
        const page = response.data;
        const termsWithDetails = page.data;
        const termDetails = page.data.map(it => it.term);
        dispatch(addTerms(termDetails));
        const terms = termsWithDetails.map(it => ({ ...it, uuid: uuidv4() }));
        setTermsWithDetails(value => [...(value || []), ...terms]);
        setNextPageNumber(value => value + 1);
        setHasMoreTerms(parseInt(page.pageNumber) < parseInt(page.pagesCount));
        if (termsWithDetails.every(it => it.name[1] === termsWithDetails[0].name[1])) {
          fetchMoreTerms(pageNumberToFetch + 1);
        }
      }).catch(ex => {
        if (ex.isAxiosError) {
          // TODO
        }
        console.log(ex);
      });
    },
    [dispatch, letter]
  );

  // TODO what if there is only one letter?
  const termsBySecondLetter = useMemo(() => {
    if (!termsWithDetails) {
      return;
    }

    const output = {};
    termsWithDetails.forEach(term => {  // TODO: fix bad usage of forEach
      const secondLetter = term.name.slice(1, 2);
      output[secondLetter] = [...(output[secondLetter] || []), term];
    });
    const grouped = Object.entries(output)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([secondLetter, terms]) =>
        [
          secondLetter,
          terms/*.sort((a, b) => a.name > b.name ? 1 : -1)*/,
        ],
      );
    if (hasMoreTerms) {
      return grouped.slice(0, grouped.length - 1)
    } else {
      return grouped;
    }
  }, [termsWithDetails, hasMoreTerms]);

  useEffect(() => {
    setTermsWithDetails([]);
    setHasMoreTerms(true);
    setNextPageNumber(1);
  }, [letter]);

  useEffect(() => {
    if (nextPageNumber === 1) {
      fetchMoreTerms(nextPageNumber);
    }
  }, [nextPageNumber, fetchMoreTerms]);

  return (
    <div>
      <InfiniteScroll
        dataLength={termsBySecondLetter.length}
        next={() => fetchMoreTerms(nextPageNumber)}
        hasMore={hasMoreTerms}
        loader={
          <p className={classNames(styles.end, styles.loading)}>
            Wczytywanie...
          </p>
        }
        endMessage={
          <p className={styles.end}>
            To już koniec wyników. Jeśli uważasz,
            że twoje wyrażenie powinno się tu
            znaleźć, <Link to="/contact">daj nam o tym znać!</Link>
          </p>
        }
      >
        {termsBySecondLetter.map(([secondLetter, terms]) => (
          <section key={secondLetter} aria-label={`Words starting with ${letter}${secondLetter}`}>
            <h2 className={styles.sectionTitle}>{letter}{secondLetter}</h2>
            <div className={styles.sectionGrid} style={{
              '--row-count-two-columns': Math.ceil(terms.length / 2),
              '--row-count-three-columns': Math.ceil(terms.length / 3),
            }}>
              {terms.map(term => (
                <Link to={`/term/${term.id}`}
                      key={term.name}>{term.name}</Link>
              ))}
            </div>
          </section>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Index;
