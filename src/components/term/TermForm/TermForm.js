import classNames from 'classnames/bind';
import { Field, FieldArray, Form, Formik } from 'formik';
import { Fragment, useState } from 'react';
import { IoAddSharp, IoCloseSharp } from 'react-icons/all';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import poland from '../../../img/poland.png';
import uk from '../../../img/uk.png';
import { addTerm, markTermIdAsNonexistent } from '../../../redux/slices/terms';
import styles from './TermForm.module.css'
import termSchema from './termSchema';

const TermForm = ({ term }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const getNewId = (firstName) => {
    if (!firstName) {
      return firstName;
    }
    return firstName.trim().replace(/\s+/g, ' ').replaceAll(" ", "-")
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleValidatedSubmit = (newTerm, setSubmitting) => {
    axiosClient[term ? "put" : "post"](`/terms/${term?.id ?? ""}`, newTerm).then(response => {
      if (term) {
        dispatch(markTermIdAsNonexistent(term.id))
      }
      const responseTerm = response.data;
      dispatch(addTerm(responseTerm));
      setSubmitting(false);
      navigate(`/term/${responseTerm.id}`);
    }).catch((error) => {
      if (error.isAxiosError) {
        if (error.response.status === 401) {
          setError("Nie masz uprawnień do wykonania tej akcji");
        } else if (error.response.status === 409) {
          setError("Jedna z nazw jest już w słowniku");
        } else if (error.response.status === 404) {
          setError("Nie znaleziono takiego terminu, być może został usunięty");
        } else {
          setError("Wystąpił błąd sieci");
          console.log(error);
        }
      } else {
        setError("Wystąpił błąd");
        console.log(error);
      }
      setValidationError(null)
      setSubmitting(false);
    });
  };

  return (
    <Formik
      initialValues={{
        names: term?.names ?? [""],
        englishTranslationsSingular: term?.englishTranslations?.map(it => it.singular || "") ?? [""],
        englishTranslationsPlural: term?.englishTranslations?.map(it => it.plural || "") ?? [""],
        definition: term?.definition ?? ""
      }}
      onSubmit={(values, { setSubmitting }) => {
        const newTerm = {
          // no id field on purpose
          names: values.names,
          englishTranslations: values.englishTranslationsSingular.map((singular, i) => (
            { singular, plural: values.englishTranslationsPlural[i] }
          )),
          definition: values.definition
        };
        termSchema.validate(newTerm).then((value) => {
          handleValidatedSubmit(value, setSubmitting);
        }).catch(ex => {
          setValidationError(ex.message);
          console.log(ex);
          setSubmitting(false);
          setError(null)
        });
      }}
    >
      {({ values, isSubmitting }) =>
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
            <p>
              Słowo będzie dostępne pod
              linkiem: {document.location.origin}/term/{getNewId(values.names[0])}
            </p>
            <p>
              <button type='reset' disabled={isSubmitting} onClick={handleCancel}>
                Anuluj
              </button>
              <button type='submit' disabled={isSubmitting}>
                Zapisz
              </button>
            </p>
            {isSubmitting && <div className={styles.warning}>Trwa zapisywanie...</div>}
            {error && <div className={styles.warning}>{error}</div>}
            {validationError && <div className={styles.warning}>{validationError}</div>}
          </section>
        </Form>
      }
    </Formik>
  )
};

export default TermForm;
