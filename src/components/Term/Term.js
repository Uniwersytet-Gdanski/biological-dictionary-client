import styles from './Term.module.css'
import poland from '../../img/poland.png';
import uk from '../../img/uk.png';
import { Fragment } from 'react';

const Term = ({ term }) => {
  return (
    <>
      <div className={styles.languageGrid}>
        <img src={poland} alt={'polskie nazwy'} />
        <div className={styles.polishSection}>
          <h1 className={styles.termSingularText}>{term.names[0]}</h1>
          {term.names.slice(1).map(name => (
            <div
              key={name}
              className={styles.termSingularText}
            >
              {name}
            </div>
          ))}
        </div>
        <img src={uk} alt={'angielskie tłumaczenia'} />
        <div className={styles.englishSection}>
          {term.englishTranslations.map((englishTranslation, i) => (
            <Fragment key={englishTranslation.singular}>
              <div
                className={styles.termSingularText}
              >
                {englishTranslation.singular}
              </div>
              <div
                className={styles.termPluralText}
              >
                lm. {englishTranslation.plural || "–"}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div className={styles.definition}>
        {term.definition}
      </div>
    </>
  )
};

export default Term;
