import { IoAddCircleSharp, IoLogOut, IoPersonCircle } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
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

  return (
    <nav className={styles.bar}>
      {user && (
        <div>
          <IoPersonCircle className={styles.icon} />
          {user.login}
          <NavLink onClick={logOut} to="/">
            <IoLogOut className={styles.icon} />
            Wyloguj
          </NavLink>
          <NavLink to="/terms/add">
            < IoAddCircleSharp className={styles.icon} />
            Dodaj
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
