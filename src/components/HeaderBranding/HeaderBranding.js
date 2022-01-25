import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';
import styles from './HeaderBranding.module.css';

const HeaderBranding = () => {
  return (
    <div className={styles.branding}>
      <h1>Polsko-Angielski Słownik Biologiczny</h1>
      <Link to="/" className={styles.logoContainer}>
        <img src={logo} alt="Logo" />
      </Link>
    </div>
  );
};

export default HeaderBranding;
