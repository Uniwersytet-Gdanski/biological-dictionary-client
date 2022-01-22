import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { setUser } from '../../redux/slices/user';
import styles from './Search.module.css';

const COMMAND_PREFIX = "/";
const LOGIN_COMMAND_PREFIX = "/login ";

const Search = () => {
  const dispatch = useDispatch();
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

  const [login, setLogin] = useState(null);

  const isTypingPassword = login !== null;
  const isCommand = queryText.startsWith(COMMAND_PREFIX) && !isTypingPassword;

  const isExpanded = (isExpandAllowed && suggestions.length && !isExpandPaused) || forceExpanded;

  const displayedQueryText = keyboardSelectedIndex >= 0
    ? suggestions[keyboardSelectedIndex].name
    : queryText;

  const getFakeSuggestion = (text) => {
    return { id: text, name: text }
  };

  useEffect(() => {
    const suggestionsReceived = (newSuggestions) => {
      const suggestionsWithKeys = newSuggestions.map(suggestion => {
        return { ...suggestion, key: `${suggestion.id}|${suggestion.name}` };
      });
      setSuggestions(suggestionsWithKeys);
    };

    if (queryText && !isTypingPassword) {
      if (isCommand) {
        if (LOGIN_COMMAND_PREFIX.startsWith(queryText) || queryText.startsWith(LOGIN_COMMAND_PREFIX)) {
          if (queryText.length > LOGIN_COMMAND_PREFIX.length) {
            suggestionsReceived([getFakeSuggestion(queryText)]);
          } else {
            suggestionsReceived([getFakeSuggestion(LOGIN_COMMAND_PREFIX)]);
          }
        }
      } else {
        axiosClient.get(`/search-terms`, {
          params: {
            query: queryText,
          },
        }).then(response => {
          suggestionsReceived(response.data.data);
        }).catch(ex => {
          // looking at other search engines (i.e. Google)
          // errors related to search suggestions don't need to be
          // displayed to the user
          console.log(ex);
        });
      }
    } else {
      suggestionsReceived([]);
    }
  }, [queryText, isCommand, isTypingPassword]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const submitText = (text, suggestionId) => {
      // graphically update the text in the query box;
      // but we don't use 'queryText' below because it's not updated yet,
      // we use 'text' instead
      if (queryText !== text) {
        setQueryText(text);
      }
      if (isCommand) {
        if (text.startsWith(LOGIN_COMMAND_PREFIX)) {
          setQueryText("");
          setLogin(text.slice(LOGIN_COMMAND_PREFIX.length));
        }
      }
      // password got submitted, perform login
      if (isTypingPassword) {
        dispatch(setUser({ username: login }));
        // axiosClient.post(`/login`, {
        //   login: login,
        //   password: text,
        // }).then(_ => {
        //   console.log("login successful");
        //   dispatch(setUser({username: login}));
        // }).catch(ex => {
        //   console.error(ex);
        //   alert("Login failed");  // TODO: better error handling
        // });

      }
      updateSelectedIndex(-1, true);
      setIsExpandPaused(true);
      if (!isCommand && !isTypingPassword) {
        if (suggestionId) {
          navigate(`/term/${suggestionId}`);
        } else {
          // TODO decide with team
          navigate(`/search?q=${encodeURIComponent(queryText)}`)
        }
      }
    };

    if (selectedIndex >= 0) {
      const selectedSuggestion = suggestions[selectedIndex];
      submitText(selectedSuggestion.name, selectedSuggestion.id);
    } else {
      submitText(queryText);
    }
  };

  const handleFormReset = () => {
    setQueryText("");
    setLogin(null);
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
        className={classNames(styles.queryInput, { [styles.queryInputExpanded]: isExpanded })}
        autoComplete="off"
        type={isTypingPassword ? "password" : "text"}
        placeholder={isTypingPassword ? "Podaj swoje hasło" : "Wpisz szukane słowo"}
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
        ❌{/* cross mark emoji (X) */}
      </button>
      <button
        className={classNames(styles.searchButton, { [styles.runButtonExpanded]: isExpanded })}
        type="submit"
      >
        {isCommand ?
          '🏠' /* home emoji */ :
          isTypingPassword ?
            '🔑' /* key emoji */ :
            '🔎' /* magnifying glass emoji */
        }
      </button>
      <div
        className={classNames(styles.suggestions,
          { [styles.suggestionsExpanded]: isExpanded })}
      >
        <section onMouseOut={handleMouseOutSuggestionList}>
          {suggestions.map((suggestion, i) => (
            <button
              className={classNames({
                [styles.hovered]: selectedIndex === i,
                [styles.commandSuggestion]: isCommand
              })}
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
