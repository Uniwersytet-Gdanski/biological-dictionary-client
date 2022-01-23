import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axiosClient from '../../axiosClient';
import Header from '../../components/Header/Header';
import Term from '../../components/Term/Term';
import { addTerms } from '../../redux/slices/terms';
import styles from './SearchRoute.module.css';

const SearchRoute = () => {
  // TODO Redux is weird
  const [searchParams] = useSearchParams();

  const query = searchParams.get('q');

  const dispatch = useDispatch();

  const [foundTerms, setFoundTerms] = useState([]);
  const [hasMoreTerms, setHasMoreTerms] = useState(true);
  const [nextPageNumber, setNextPageNumber] = useState(1);

  const fetchMoreTerms = useCallback(
    () => {
      axiosClient.get(`/search-terms`, {
        params: {
          query: query,
          withFullTerms: true,
          withoutDuplicates: true,
          pageNumber: nextPageNumber
        },
      }).then(response => {
        const page = response.data;
        const termsRaw = page.data.map(it => it.term);
        dispatch(addTerms(termsRaw));
        const terms = termsRaw.map(it => ({ ...it, uuid: uuidv4() }));
        setFoundTerms(value => [...(value || []), ...terms]);
        setNextPageNumber(value => value + 1);
        setHasMoreTerms(parseInt(page.pageNumber) < parseInt(page.pagesCount))
      }).catch(ex => {
        if (ex.isAxiosError) {
          // TODO
        }
        console.log(ex);
      });
    },
    [dispatch, nextPageNumber, query]
  );

  useEffect(() => {
    setFoundTerms([]);
    setHasMoreTerms(true);
    setNextPageNumber(1);
  }, [query]);

  useEffect(() => {
    if (nextPageNumber === 1) {
      fetchMoreTerms();
    }
  }, [nextPageNumber, fetchMoreTerms]);

  return (
    <div className={styles.route}>
      <Helmet>
        <title>
          123 - wyszukaj - Słownik Biologiczny
        </title>
      </Helmet>
      <Header initialQuery={query} />
      <div className={styles.mainContainer}>
        <main className={styles.main}>
          <h1>"{query}" po angielsku</h1>
          <InfiniteScroll
            dataLength={foundTerms.length}
            next={fetchMoreTerms}
            hasMore={hasMoreTerms}
            loader={
              <p className={classNames(styles.end, { [styles.empty]: !foundTerms.length })}>
                Wczytywanie...
              </p>
            }
            endMessage={
              <p className={classNames(styles.end, { [styles.empty]: !foundTerms.length })}>
                {foundTerms.length ? "To już koniec wyników." : "Brak wyników."} Jeśli uważasz,
                że twoje wyrażenie powinno się tu
                znaleźć, <Link to="/contact">daj nam o tym znać!</Link>
              </p>
            }
          >
            {foundTerms.map(term => (
              <div key={term.uuid} className={styles.termContainer}>
                {/* note: .id is not unique, .uuid is */}
                <Term term={term} />
              </div>
            ))}
          </InfiniteScroll>
          {!foundTerms && 'Ładowanie...'}
        </main>
      </div>
    </div>
  );
};

export default SearchRoute;
