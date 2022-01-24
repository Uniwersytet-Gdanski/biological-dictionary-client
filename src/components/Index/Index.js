import classNames from 'classnames/bind';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { addTerms } from '../../redux/slices/terms';
import styles from './Index.module.css';

const Index = ({ letter }) => {
  const dispatch = useDispatch();

  const {
    items,
    hasMoreItems,
    nextPageNumber,
    fetchMoreItems,
    lastElementRef,
    error
  } = useInfiniteScroll(
    '/terms-by-prefix',
    { prefix: letter, withFullTerms: true, pageSize: 20 },
    (page) => {
      const termsForRedux = page.data.map(it => it.term);
      dispatch(addTerms(termsForRedux));
    },
    [letter],
    (items, pageItems) => {
      if (items.length) {
        return pageItems.every(it => it.name[1] === items[items.length - 1].name[1]);
      } else {
        return pageItems.every(it => it.name[1] === pageItems[0].name[1]);
      }
    });

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
    <div>
      <InfiniteScroll
        dataLength={termsBySecondLetter.length}
        next={() => fetchMoreItems(nextPageNumber, items)}
        hasMore={hasMoreItems}
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
          <section
            key={secondLetter}
            aria-label={`Words starting with ${letter}${secondLetter}`}
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
    </div>
  );
};

export default Index;
