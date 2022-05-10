import styles from './ScrollTopButton.module.css';
import classNames from 'classnames';
import {useEffect, useState} from 'react';
import {IoArrowUp} from 'react-icons/all';

const ScrollTopButton = () => {
  const handleClick = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      console.log('hi');
      setIsHidden(window.scrollY < 500);
    };

    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <button
          className={
            classNames(styles.button, {[styles.hidden]: isHidden})
          }
          onClick={handleClick}>
        <IoArrowUp size={32} />
      </button>
  );
};

export default ScrollTopButton;
