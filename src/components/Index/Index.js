import classNames from 'classnames/bind';
import { useCallback, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { addTerms } from '../../redux/slices/terms';
import styles from './Index.module.css';

const Index = ({ letter }) => {
  const dispatch = useDispatch();

  const axiosParams = useMemo(() => {
    return { prefix: letter, withFullTerms: true, pageSize: 50 }
  }, [letter]);

  const onPageFetch = useCallback(
    (page) => {
      const termsForRedux = page.data.map(it => it.term);
      dispatch(addTerms(termsForRedux));
    },
    [dispatch],
  );

  const resetDeps = useMemo(() => [letter], [letter]);

  const shouldFetchMore = useCallback(
    (pageItems) => {
      return pageItems.every(it => it.name[1] === pageItems[0].name[1]);
    },
    [],
  );

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
    resetDeps,
    shouldFetchMore
  );

  // when there is only one letter in a word it SOMEHOW works
  // hopefully it continues working!
  const termsBySecondLetter = useMemo(() => {
    if (!items) {
      return;
    }

    const output = {};
    items.forEach(term => {  // TODO: fix bad usage of forEach
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
    if (hasMoreItems) {
      return grouped.slice(0, grouped.length - 1)
    } else {
      return grouped;
    }
  }, [items, hasMoreItems]);

  return (
    <div className={classNames({[styles.hasMoreItems]: hasMoreItems})}>
      <InfiniteScroll
        dataLength={termsBySecondLetter.length}
        next={fetchMoreItems}
        hasMore={hasMoreItems}
        loader={
          <section>
            {!items.length && <h2 className={styles.sectionTitle}><AiOutlineLoading3Quarters className={styles.icon} /></h2>}
            <p className={styles.warning} >Wczytywanie...</p>
          </section>
        }
        endMessage={
          <p className={styles.end}>
            To już koniec wyników. Jeśli uważasz,
            że twoje wyrażenie powinno się tu
            znaleźć, <Link to="/contact">daj nam o tym znać</Link>!
          </p>
        }
      >
        {termsBySecondLetter.map(([secondLetter, terms]) => (
          <section
            key={secondLetter}
            aria-label={`Words starting with ${letter}${secondLetter}`}
            className={styles.secondLetterSection}
            ref={lastElementRef}
          >
            <h2 className={styles.sectionTitle}>{letter}{secondLetter}</h2>
            <div className={styles.sectionGrid} style={{
              '--row-count-two-columns': Math.ceil(terms.length / 2),
              '--row-count-three-columns': Math.ceil(terms.length / 3),
            }}>
              {terms.map(term => (
                <Link to={`/term/${term.id}?q=${encodeURIComponent(term.name)}`}
                      key={term.name}>{term.name}</Link>
              ))}
            </div>
          </section>
        ))}
      </InfiniteScroll>
      <div className={styles.warning}>{error}</div>
    </div>
  );
};

export default Index;
