import classNames from 'classnames/bind';
import { useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Term from '../../components/Term/Term';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { addTerms } from '../../redux/slices/terms';
import styles from './SearchRoute.module.css';

const SearchRoute = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('q');

  const dispatch = useDispatch();

  const axiosParams = useMemo(() => {
    return { query, withFullTerms: true, withoutDuplicates: true, pageSize: 10 }
  }, [query]);

  const onPageFetch = useCallback(
    (page) => {
      const termsForRedux = page.data.map(it => it.term);
      dispatch(addTerms(termsForRedux));
    },
    [dispatch],
  );

  const resetDeps = useMemo(() => [query], [query]);

  const {
    items,
    hasMoreItems,
    fetchMoreItems,
    lastElementRef,
    error
  } = useInfiniteScroll(
    '/terms-by-prefix',
    axiosParams,
    onPageFetch,
    resetDeps
  );

  const terms = items.map(item => ({...item.term, uuid: item.uuid}));

  return (
    <div className={styles.route}>
      <Helmet>
        <title>
          123 - wyszukaj - Słownik Biologiczny
        </title>
      </Helmet>
      <Header initialQuery={query} />
      <main className={styles.main}>
        <h1>"{query}" po angielsku</h1>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreItems}
          hasMore={hasMoreItems}
          loader={
            <p className={classNames(styles.end, { [styles.empty]: !items.length })}>
              Wczytywanie...
            </p>
          }
          endMessage={
            <p className={classNames(styles.end, { [styles.empty]: !items.length })}>
              {items.length ? "To już koniec wyników." : "Brak wyników."} Jeśli uważasz,
              że twoje wyrażenie powinno się tu
              znaleźć, <Link to="/contact">daj nam o tym znać!</Link>
            </p>
          }
        >
          {terms.map(term => (
            <div
              key={term.uuid}
              ref={lastElementRef}
              className={styles.termContainer}
            >
              {/* note: .id is not unique, .uuid is */}
              <Term term={term} />
            </div>
          ))}
        </InfiniteScroll>
        {error && 'Błąd:' + error}
      </main>
    </div>
  );
};

export default SearchRoute;
