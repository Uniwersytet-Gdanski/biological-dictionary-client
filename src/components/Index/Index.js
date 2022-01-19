import styles from './Index.module.css';
import {useEffect, useMemo, useRef, useState} from 'react';
import axiosClient from '../../axiosClient';
import {Link} from 'react-router-dom';

const Index = ({letter}) => {
  const [entryPage, setEntryPage] = useState(null);

  useEffect(() => {
    axiosClient.get(`/entries-by-prefix`, {
      params: {
        prefix: letter,
        pageSize: 30
      },
    }).then(response => {
      setEntryPage(response.data);
    }).catch(ex => {
      // looking at other search engines (i.e. Google)
      // errors related to search suggestions don't need to be
      // displayed to the user
      console.log(ex);
    });
  }, [letter]);

  // TODO what if there is only one letter?
  const entriesBySecondLetter = useMemo(() => {
    if (!entryPage) {
      return;
    }

    const output = {};
    entryPage.data.map(entry => {
      const secondLetter = entry.name.slice(1, 2);
      output[secondLetter] = [...(output[secondLetter] || []), entry];
    });
    return Object.entries(output).
        sort((a, b) => a[0].localeCompare(b[0])).
        map(([secondLetter, entries]) =>
            [
              secondLetter,
              entries/*.sort((a, b) => a.name > b.name ? 1 : -1)*/,
            ],
        );
  }, [entryPage]);

  console.log(entriesBySecondLetter)

  return (
      <div>
        {entriesBySecondLetter &&
            entriesBySecondLetter.map(([secondLetter, entries]) => (
                <section key={secondLetter} aria-label={`Words starting with ${letter}${secondLetter}`}>
                  <h2 className={styles.sectionTitle}>{letter}{secondLetter}</h2>
                  <div className={styles.sectionGrid} style={{
                    '--row-count-two-columns': Math.ceil(entries.length / 2),
                    '--row-count-three-columns': Math.ceil(entries.length / 3),
                  }}>
                    {entries.map(entry => (
                        <Link to={`/term/${entry.id}`}
                              key={entry.name}>{entry.name}</Link>
                    ))}
                  </div>
                </section>
            ))}
        {!entriesBySecondLetter && "Wczytywanie..."}
      </div>
  );
};

export default Index;
