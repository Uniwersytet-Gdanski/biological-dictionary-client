import styles from './Search.module.css'
import classNames from 'classnames';

const Search = () => {
  const suggestions = ["aborcja", "akupunktura", "analfabetyzm"]

  const isExpanded = true; // manually toggled by changing this line and recompiling

  const handleSuggestionClick = () => {

  }

  return (
    <form className={styles.queryForm}>
      <input
        className={classNames(styles.queryInput, { [styles.queryInputExpanded]: isExpanded })}
        autoComplete="off"
        type="text"
        placeholder="Wpisz szukane słowo" />
      <button
        className={classNames(styles.runButton, { [styles.runButtonExpanded]: isExpanded })}
        type="submit"
      >
        🔎{/*magnifying glass*/}
      </button>
      <div
        className={classNames(styles.suggestions, { [styles.suggestionsExpanded]: isExpanded })}
      >
        <section>
          {suggestions.map(suggestion => (
            <div
              key={suggestion}
              data-id={suggestion}
              onClick={handleSuggestionClick}
            >
              {suggestion}
            </div>
          ))}
        </section>
      </div>
    </form>
  )
}

export default Search;
