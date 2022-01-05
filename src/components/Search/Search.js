import styles from './Search.module.css';
import classNames from 'classnames';
import {useState} from 'react';

const Search = () => {
  const suggestions = ['akupunktura', 'analfabetyzm', 'antropologia'];

  const [isExpandAllowed, setIsExpandAllowed] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [queryText, setQueryText] = useState('');

  // a toggle for development purposes
  const forceExpanded = false;

  const isExpanded = (isExpandAllowed && suggestions.length) || forceExpanded;

  const displayedQueryText = selectedIndex >= 0
      ? suggestions[selectedIndex]
      : queryText;

  const submitText = (text) => {
    if (queryText !== text) {
      setQueryText(text);
    }
    setTimeout(() => alert(text), 0);
  };

  const handleFormSubmit = (event) => {
    if (selectedIndex >= 0) {
      const selectedSuggestion = suggestions[selectedIndex];
      submitText(selectedSuggestion);
    } else {
      submitText(queryText);
    }
  };

  // hide suggestion dropdown when form focus is lost
  const handleFormBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsExpandAllowed(false);
    }
  };

  const handleFormFocus = (event) => {
    setIsExpandAllowed(true);
  };

  // handle arrow navigation in suggestion dropdown
  const handleKeyDown = (event) => {
    const updateIndex = (modifier) => {
      event.preventDefault();

      const newIndex = selectedIndex + modifier;
      // -1 is ok too, it means no suggestion selected
      const getFinalIndex = () => {
        if (suggestions.length === 0) {
          return -1;
        }
        if (newIndex < -1) {
          return suggestions.length - 1;
        }
        if (newIndex >= suggestions.length) {
          return -1;
        }
        return newIndex;
      };
      const finalIndex = getFinalIndex();
      setSelectedIndex(finalIndex);
    };

    if (event.key === 'ArrowDown') {
      updateIndex(1);
    } else if (event.key === 'ArrowUp') {
      updateIndex(-1);
    }
  };

  const onQueryChange = (event) => {
    setQueryText(event.target.value);
    setSelectedIndex(-1);
  };

  const handleMouseOverSuggestion = (event) => {
    const hoveredIndex = parseInt(event.target.dataset.index);
    setSelectedIndex(hoveredIndex);
  };

  return (
      <form
          className={styles.queryForm}
          onSubmit={handleFormSubmit}
          onFocus={handleFormFocus}
          onBlur={handleFormBlur}
      >
        <input
            className={classNames(styles.queryInput, {[styles.queryInputExpanded]: isExpanded})}
            autoComplete="off"
            type="text"
            placeholder="Wpisz szukane słowo"
            autoFocus
            value={displayedQueryText}
            onChange={onQueryChange}
            onKeyDown={handleKeyDown}
        />
        <button
            className={classNames(styles.runButton, {[styles.runButtonExpanded]: isExpanded})}
            type="submit"
        >
          🔎{/*magnifying glass*/}
        </button>
        <div
            className={classNames(styles.suggestions,
                {[styles.suggestionsExpanded]: isExpanded})}
        >
          <section>
            {suggestions.map((suggestion, i) => (
                <button
                    className={classNames({[styles.hovered]: selectedIndex === i})}
                    type="submit"
                    key={suggestion}
                    data-text={suggestion}
                    data-index={i}
                    onMouseOver={handleMouseOverSuggestion}
                >
                  {suggestion}
                </button>
            ))}
          </section>
        </div>
      </form>
  );
};

export default Search;
