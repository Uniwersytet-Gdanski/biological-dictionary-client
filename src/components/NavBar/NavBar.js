import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../redux/slices/user';

import styles from './NavBar.module.css'

const NavBar = () => {
  const user = useSelector(getUser);  // TODO: logout button and going to dashboard
  return (
    <nav className={styles.bar}>
      {user && (
        <div>
          📴 {user.username}
        </div>
      )}
      <NavLink to="/about">O słowniku</NavLink>
      <NavLink to="/authors">Autorzy</NavLink>
      <NavLink to="/contact">Kontakt</NavLink>
    </nav>
  )
};

export default NavBar;
