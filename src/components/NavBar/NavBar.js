import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <nav className={styles.bar}>
      <NavLink to="/about">O słowniku</NavLink>
      <NavLink to="/authors">Autorzy</NavLink>
      <NavLink to="/contact">Kontakt</NavLink>
    </nav>
  )
}

export default NavBar;
