import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';
import styles from './HeaderBranding.module.css';

const HeaderBranding = () => {
  return (
    <div className={styles.branding}>
      <div className={styles.titleContainer}>
        <Link to="/" className={styles.title}>
          Polsko-Angielski Słownik Biologiczny
        </Link>
      </div>
      <Link to="/" className={styles.logoContainer}>
        <img src={logo} alt="Logo" />
      </Link>
    </div>
  );
};

export default HeaderBranding;
