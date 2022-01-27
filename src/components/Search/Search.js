import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ImKey } from 'react-icons/im';
import { IoHome, IoPerson } from 'react-icons/io5';
import { VscChromeClose } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import useLoginCommand from '../../hooks/commands/useLoginCommand';
import useLogoutCommand from '../../hooks/commands/useLogoutCommand';
import magnifyingGlass from '../../img/magnifying-glass.png'
import styles from './Search.module.css';

const COMMAND_PREFIX = "/";

const Search = ({ initialQuery }) => {
  const navigate = useNavigate();
  const queryInputRef = useRef();

  const [suggestions, setSuggestions] = useState([]);

  const [isExpandAllowed, setIsExpandAllowed] = useState(false);
  // whether to temporarily hide the suggestion dropdown
  // until any new user interaction with the query text input.
  // used when submitting - the user only has a chance to really use this
  // when they are on a bad connection.
  const [isExpandPaused, setIsExpandPaused] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [keyboardSelectedIndex, setKeyboardSelectedIndex] = useState(-1);
  const [queryText, setQueryText] = useState(initialQuery || '');

  // a toggle for development purposes
  const forceExpanded = false;

  const [isTypingLogin, setIsTypingLogin] = useState(false);
  const [login, setLogin] = useState(null);

  const isTypingPassword = login !== null;
  const isCommand = queryText.startsWith(COMMAND_PREFIX) && !isTypingPassword;

  const isExpanded = (isExpandAllowed && suggestions.length && !isExpandPaused) || forceExpanded;

  const displayedQueryText = keyboardSelectedIndex >= 0
    ? suggestions[keyboardSelectedIndex].name
    : queryText;

  const loginCommand = useLoginCommand();
  const logoutCommand = useLogoutCommand();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const commands = useMemo(() => [loginCommand, logoutCommand], [loginCommand.name, logoutCommand.name]);

  // hacky workaround to the fact that having autoFocus on an input automatically brings up the
  // virtual keyboard on mobile devices, at least in mobile Chrome on Android
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    .test(navigator.userAgent);

  const getFakeSuggestion = (text) => {
    return { id: text, name: text }
  };

  useEffect(() => {
    setQueryText(initialQuery || '');
    queryInputRef.current.select();
    // doesn't work without setTimeout on page reload, so we'll do it twice
    setTimeout(() => {
      queryInputRef.current.select();
    }, 0);
  }, [initialQuery]);

  useEffect(() => {
    const suggestionsReceived = (newSuggestions) => {
      const suggestionsWithKeys = newSuggestions.map(suggestion => {
        return { ...suggestion, key: `${suggestion.id}|${suggestion.name}` };
      });
      setSuggestions(suggestionsWithKeys);
    };

    if (queryText && !isTypingPassword && !isTypingLogin) {
      if (isCommand) {
        const commandSuggestions = [];
        commands.forEach(command => {
          if (command.name.startsWith(queryText.slice(COMMAND_PREFIX.length)) && queryText.length <= command.name.length && command.canBeRun) {
            commandSuggestions.push(getFakeSuggestion(COMMAND_PREFIX + command.name));
          }
        });
        suggestionsReceived(commandSuggestions);
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
  }, [commands, queryText, isCommand, isTypingPassword, isTypingLogin]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const submitText = (text, suggestionId) => {
      if (text === "") {
        return;
      }
      // graphically update the text in the query box;
      // but we don't use 'queryText' below because it's not updated yet,
      // we use 'text' instead
      if (queryText !== text) {
        setQueryText(text);
      }
      if (isCommand) {
        const isThatCommand = (command) => text.slice(COMMAND_PREFIX.length) === command.name;
        if (isThatCommand(loginCommand)) {
          setIsTypingLogin(true);
          setQueryText("");
        } else if (isThatCommand(logoutCommand)) {
          logoutCommand.handleExecute();
          setQueryText("");
        }
      }
      if (isTypingLogin) {
        setQueryText("");
        setLogin(text);
        setIsTypingLogin(false);
      }
      // password got submitted, perform login
      if (isTypingPassword) {
        setLogin(null);
        setQueryText("");
        loginCommand.handleExecute(login, text);
      }
      updateSelectedIndex(-1, true);
      setIsExpandPaused(true);
      if (!isCommand && !isTypingLogin && !isTypingPassword) {
        if (suggestionId) {
          navigate(`/term/${suggestionId}?q=${encodeURIComponent(text)}`);
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
    <>
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
          placeholder={isTypingPassword ? "Podaj swoje hasło" : isTypingLogin ? "Podaj swój login" : "Wpisz szukane słowo"}
          autoFocus={!isMobileDevice}
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
          <VscChromeClose className={styles.icon} /> {/* cross mark (X) */}
        </button>
        <button
          className={classNames(styles.searchButton, { [styles.runButtonExpanded]: isExpanded })}
          type="submit"
        >
          {isCommand ?
            <IoHome className={styles.icon} /> :
            isTypingLogin ?
              <IoPerson className={styles.icon} /> :
              isTypingPassword ?
                <ImKey className={styles.icon} /> :
                <img src={magnifyingGlass} alt='' />
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
      {loginCommand.error && <div className={styles.warning}>{loginCommand.error}</div>}
      {logoutCommand.error && <div className={styles.warning}>{logoutCommand.error}</div>}
    </>
  );
};

export default Search;
