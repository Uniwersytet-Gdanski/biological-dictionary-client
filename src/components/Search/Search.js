import styles from './Search.module.css';
import classNames from 'classnames';
import {useEffect, useState} from 'react';
import axios from 'axios';

const Search = () => {
  const [suggestions, setSuggestions] = useState([]);

  const [isExpandAllowed, setIsExpandAllowed] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [keyboardSelectedIndex, setKeyboardSelectedIndex] = useState(-1);
  const [queryText, setQueryText] = useState('');

  // a toggle for development purposes
  const forceExpanded = false;

  const isExpanded = (isExpandAllowed && suggestions.length) || forceExpanded;

  const displayedQueryText = keyboardSelectedIndex >= 0
      ? suggestions[keyboardSelectedIndex]
      : queryText;

  const submitText = (text) => {
    if (queryText !== text) {
      setQueryText(text);
    }
  };

  useEffect(() => {
    const suggestionsReceived = (newSuggestionsRaw) => {
      const newSuggestions = newSuggestionsRaw.map(it => it.name);
      setSuggestions(newSuggestions);
    }

    if (queryText) {
      axios.get(`${process.env.REACT_APP_BASE_API_URL}/search-entries?query=${encodeURI(queryText)}`)
          .then(response => {
            suggestionsReceived(response.data);
          })
          .catch(ex => {
            console.log(ex)
          });
    } else {
      suggestionsReceived([]);
    }
  }, [queryText]);

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
    // check if the focus is lost to an item inside the form,
    // or outside the form. only hide dropdown if to outside.
    // source/reference: https://reactjs.org/docs/events.html#focus-events
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsExpandAllowed(false);
    }
  };

  const handleFormFocus = (event) => {
    setIsExpandAllowed(true);
  };


  const updateSelectedIndex = (newIndex, isKeyboard) => {
    setSelectedIndex(newIndex);
    if (isKeyboard) {
      setKeyboardSelectedIndex(newIndex);
    }
  }

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
      updateSelectedIndex(finalIndex, true);
    };

    if (event.key === 'ArrowDown') {
      updateIndex(1);
    } else if (event.key === 'ArrowUp') {
      updateIndex(-1);
    }
  };

  const onQueryChange = (event) => {
    setQueryText(event.target.value);
    updateSelectedIndex(-1, true);
  };

  const handleMouseOverSuggestion = (event) => {
    const hoveredIndex = parseInt(event.target.dataset.index);
    updateSelectedIndex(hoveredIndex, false);
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
