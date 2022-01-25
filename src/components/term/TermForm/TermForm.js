import classNames from 'classnames/bind';
import { Field, FieldArray, Form, Formik } from 'formik';
import { Fragment } from 'react';
import { IoAddSharp, IoCloseSharp } from 'react-icons/all';
import poland from '../../../img/poland.png';
import uk from '../../../img/uk.png';
import styles from './TermForm.module.css'

const TermForm = ({ term }) => {
  const getNewId = (firstName) => {
    if (!firstName) {
      return firstName;
    }
    return firstName.replaceAll(" ", "-")
  };

  return (
    <Formik
      initialValues={{
        names: term.names,
        englishTranslationsSingular: term.englishTranslations.map(it => it.singular),
        englishTranslationsPlural: term.englishTranslations.map(it => it.plural),
        definition: term.definition
      }}
      onSubmit={(values, { setSubmitting }) => {
        const newTerm = {
          id: getNewId(values.names[0]),
          names: values.names,
          englishTranslations: values.englishTranslationsSingular.map((singular, i) => (
            { singular, plural: values.englishTranslationsPlural[i] }
          )),
          definition: values.definition
        };
        alert(JSON.stringify(newTerm, null, 2));
        setSubmitting(false);
      }}
    >
      {({ values }) =>
        <Form>
          <div className={styles.languageGrid}>
            <img src={poland} alt={'polskie nazwy'} />
            <div className={styles.polishSection}>
              <FieldArray name="names" render={arrayHelpers => (
                <div>
                  {values.names.map((name, i) => (
                    <div className={styles.flexRow} key={i}>
                      <Field
                        name={`names.${i}`}
                        key={i}
                        className={styles.termSingularText}
                        size="5"
                      />
                      <button
                        type="button"
                        className={styles.cleanButton}
                        onClick={() => arrayHelpers.remove(i)}
                      >
                        <IoCloseSharp />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className={styles.cleanButton}
                    onClick={() => arrayHelpers.push('')}
                  >
                    <IoAddSharp />
                  </button>
                </div>
              )} />
            </div>
            <img src={uk} alt={'angielskie tłumaczenia'} />
            <div className={styles.englishSection}>
              <FieldArray name="englishTranslationsSingular" render={singularHelpers => (
                <FieldArray name="englishTranslationsPlural" render={pluralHelpers => (
                  <>
                    {values.englishTranslationsSingular.map((singular, i) => (
                      <Fragment key={i}>
                        <div
                          className={styles.flexRow}
                        >
                          <div className={styles.plurality}>lp.</div>
                          <Field
                            name={`englishTranslationsSingular.${i}`}
                            key={i}
                            className={styles.termSingularText}
                            size="5"
                          />
                        </div>
                        <div
                          className={styles.flexRow}
                        >
                          <div className={styles.plurality}>lm.</div>
                          <div
                            className={classNames(styles.flexRow, styles.termPluralTextContainer)}
                          >
                            <Field
                              name={`englishTranslationsPlural.${i}`}
                              key={i}
                              className={styles.termPluralText}
                              size="5"
                            />
                          </div>
                          <button
                            type="button"
                            className={styles.cleanButton}
                            onClick={() => {
                              singularHelpers.remove(i);
                              pluralHelpers.remove(i);
                            }}
                          >
                            <IoCloseSharp />
                          </button>
                        </div>
                      </Fragment>
                    ))}
                    <div>
                      <button
                        type="button"
                        className={styles.cleanButton}
                        onClick={() => {
                          singularHelpers.push('');
                          pluralHelpers.push('');
                        }}
                      >
                        <IoAddSharp />
                      </button>
                    </div>
                  </>
                )} />
              )} />
            </div>
          </div>
          <div className={styles.definition}>
            <Field
              name="definition"
              size="5"
            />
          </div>
          <section className={styles.summarySection}>
            <p>Słowo będzie dostępne pod
              linkiem: {document.location.origin}/term/{getNewId(values.names[0])}</p>

            <p>
              <button type='submit'>
                Zapisz
              </button>
            </p>
          </section>
        </Form>
      }
    </Formik>
  )
};

export default TermForm;
