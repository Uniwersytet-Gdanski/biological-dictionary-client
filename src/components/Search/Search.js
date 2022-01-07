import styles from './Search.module.css';
import classNames from 'classnames';
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const queryInputRef = useRef();

  const [suggestions, setSuggestions] = useState([]);

  const [isExpandAllowed, setIsExpandAllowed] = useState(false);
  // whether to temporarily hide the suggestion dropdown
  // until any new user interaction with the query text input.
  // used when submitting - the user only has a chance to really use this
  // when they are on a bad connection.
  const [isExpandPaused, setIsExpandPaused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [keyboardSelectedIndex, setKeyboardSelectedIndex] = useState(-1);
  const [queryText, setQueryText] = useState('');

  // a toggle for development purposes
  const forceExpanded = false;

  const isExpanded = (isExpandAllowed && suggestions.length && !isExpandPaused) || forceExpanded;

  const displayedQueryText = keyboardSelectedIndex >= 0
      ? suggestions[keyboardSelectedIndex].name
      : queryText;

  useEffect(() => {
    const suggestionsReceived = (newSuggestions) => {
      const suggestionsWithKeys = newSuggestions.map(suggestion => {
        return {...suggestion, key: `${suggestion.id}|${suggestion.name}`};
      })
      setSuggestions(suggestionsWithKeys);
    };

    if (queryText) {
      axios.get(`${process.env.REACT_APP_BASE_API_URL}/search-entries`, {
        params: {
          query: queryText,
        },
      }).then(response => {
        suggestionsReceived(response.data);
      }).catch(ex => {
        // looking at other search engines (i.e. Google)
        // errors related to search suggestions don't need to be
        // displayed to the user
        console.log(ex);
      });
    } else {
      suggestionsReceived([]);
    }
  }, [queryText]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const submitText = (text, suggestionId) => {
      // graphically update the text in the query box;
      // but we don't use 'queryText' below because it's not updated yet,
      // we use 'text' instead
      if (queryText !== text) {
        setQueryText(text);
      }
      updateSelectedIndex(-1, true);
      setIsExpandPaused(true);
      if (suggestionId) {
        navigate(`/term/${suggestionId}`);
      } else {
        // TODO decide with team
        alert("hi");
      }
    };

    if (selectedIndex >= 0) {
      const selectedSuggestion = suggestions[selectedIndex];
      submitText(selectedSuggestion.text, selectedSuggestion.id);
    } else {
      submitText(queryText);
    }
  };

  const handleFormReset = () => {
    setQueryText("");
    queryInputRef.current.focus();
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
    setIsExpandPaused(false);
    if (isKeyboard) {
      setKeyboardSelectedIndex(newIndex);
    }
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

  const handleMouseOutSuggestionList = (event) => {
    updateSelectedIndex(-1, false);
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
            ref={queryInputRef}
        />
        <button
            className={styles.clearButton}
            type="reset" // this doesn't reset automatically though :/
            onClick={handleFormReset}
        >
          ❌{/* cross mark (X) */}
        </button>
        <button
            className={classNames(styles.searchButton, {[styles.runButtonExpanded]: isExpanded})}
            type="submit"
        >
          🔎{/*magnifying glass*/}
        </button>
        <div
            className={classNames(styles.suggestions,
                {[styles.suggestionsExpanded]: isExpanded})}
        >
          <section onMouseOut={handleMouseOutSuggestionList}>
            {suggestions.map((suggestion, i) => (
                <button
                    className={classNames({[styles.hovered]: selectedIndex === i})}
                    type="submit"
                    key={suggestion.key}
                    data-id={suggestion.id}
                    data-name={suggestion.name}
                    data-index={i}
                    onMouseOver={handleMouseOverSuggestion}
                >
                  {suggestion.name}
                </button>
            ))}
          </section>
        </div>
      </form>
  );
};

export default Search;
