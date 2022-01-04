import styles from './Search.module.css'

const Search = () => {
  return (
    <form className={styles.queryForm}>
      <input autoComplete="off" className={styles.queryInput} type="text" placeholder="Wpisz szukane słowo" />
      <button type="submit" className={styles.runButton}>🔎{/*magnifying glass*/}</button>
    </form>
  )
}

export default Search;
