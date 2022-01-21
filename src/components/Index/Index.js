import styles from './Index.module.css';
import {useEffect, useMemo, useRef, useState} from 'react';
import axiosClient from '../../axiosClient';
import {Link} from 'react-router-dom';

const Index = ({letter}) => {
  const [termPage, setTermPage] = useState(null);

  useEffect(() => {
    axiosClient.get(`/terms-by-prefix`, {
      params: {
        prefix: letter,
        pageSize: 30
      },
    }).then(response => {
      setTermPage(response.data);
    }).catch(ex => {
      // looking at other search engines (i.e. Google)
      // errors related to search suggestions don't need to be
      // displayed to the user
      console.log(ex);
    });
  }, [letter]);

  // TODO what if there is only one letter?
  const termsBySecondLetter = useMemo(() => {
    if (!termPage) {
      return;
    }

    const output = {};
    termPage.data.map(term => {
      const secondLetter = term.name.slice(1, 2);
      output[secondLetter] = [...(output[secondLetter] || []), term];
    });
    return Object.entries(output).
        sort((a, b) => a[0].localeCompare(b[0])).
        map(([secondLetter, terms]) =>
            [
              secondLetter,
              terms/*.sort((a, b) => a.name > b.name ? 1 : -1)*/,
            ],
        );
  }, [termPage]);

  console.log(termsBySecondLetter)

  return (
      <div>
        {termsBySecondLetter &&
            termsBySecondLetter.map(([secondLetter, terms]) => (
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
        {!termsBySecondLetter && "Wczytywanie..."}
      </div>
  );
};

export default Index;
