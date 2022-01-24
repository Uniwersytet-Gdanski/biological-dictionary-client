import { IoLogOut, IoPersonCircle } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../redux/slices/user';

import styles from './NavBar.module.css'

const NavBar = () => {
  const user = useSelector(getUser);  // TODO: logout button
  return (
    <nav className={styles.bar}>
      {user && (
        <div>
          <NavLink to="/dashboard">
            <IoPersonCircle className={styles.icon} />
            {user.username}
          </NavLink>
          <NavLink to="/dashboard">
            <IoLogOut className={styles.icon} />
            Wyloguj
          </NavLink>
        </div>
      )}
      <NavLink to="/about">O słowniku</NavLink>
      <NavLink to="/authors">Autorzy</NavLink>
      <NavLink to="/contact">Kontakt</NavLink>
    </nav>
  )
};

export default NavBar;
