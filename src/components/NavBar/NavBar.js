import classNames from 'classnames/bind';
import { IoAddCircleSharp, IoLogOut, IoPersonCircle } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { getUser, setUser } from '../../redux/slices/user';
import styles from './NavBar.module.css'

const NavBar = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUser);

  const logOut = () => {
    axiosClient.post(`/logout`)
      .then(_ => {
        console.log("logout successful");
        dispatch(setUser(null));
      }).catch(ex => {
      console.error(ex);
      alert("Logout failed");  // TODO: better error handling
    });
  };

  const TheNavLink = ({to, children}) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          classNames({[styles.activeNavLink]: isActive})
        }
      >
        {children}
      </NavLink>
    )
  };

  return (
    <nav className={styles.bar}>
      {user && (
        <div>
          <IoPersonCircle className={styles.icon} />
          {user.login}
          <Link onClick={logOut} to="/">
            <IoLogOut className={styles.icon} />
            Wyloguj
          </Link>
          <TheNavLink to="/terms/add">
            <IoAddCircleSharp className={styles.icon} />
            Dodaj
          </TheNavLink>
        </div>
      )}
      <TheNavLink to="/about">O słowniku</TheNavLink>
      <TheNavLink to="/authors">Autorzy</TheNavLink>
      <TheNavLink to="/contact">Kontakt</TheNavLink>
    </nav>
  )
};

export default NavBar;
