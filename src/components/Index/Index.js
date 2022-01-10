import styles from './Index.module.css';
import {useEffect, useMemo, useRef, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Index = ({letter}) => {
  const [entryPage, setEntryPage] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_API_URL}/entries-by-prefix`, {
      params: {
        prefix: letter,
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
        sort((a, b) => a[0] > b[0] ? 1 : -1).
        map(([secondLetter, entries]) =>
            [
              secondLetter,
              entries.sort((a, b) => a[0] > b[0] ? 1 : -1),
            ],
        );
  }, [entryPage]);

  console.log(entriesBySecondLetter)

  return (
      <div>
        {entriesBySecondLetter &&
            entriesBySecondLetter.map(([secondLetter, entries]) => (
                <section key={secondLetter}>
                  <h2 className={styles.sectionTitle}>{letter}{secondLetter}</h2>
                  <main className={styles.sectionGrid} style={{
                    '--row-count-two-columns': Math.ceil(entries.length / 2),
                    '--row-count-three-columns': Math.ceil(entries.length / 3),
                  }}>
                    {entries.map(entry => (
                        <Link to={`/term/${secondLetter}`}
                              key={entry.id}>{entry.name}</Link>
                    ))}
                  </main>
                </section>
            ))}
      </div>
  );
};

export default Index;
