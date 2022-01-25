import { Helmet } from 'react-helmet-async';
import About from '../../components/About/About';
import styles from './AboutRoute.module.css'

const AboutRoute = () => {
  return (
    <div className={styles.route}>
      <Helmet>
        <title> O słowniku - Słownik Biologiczny </title>
      </Helmet>
      <About />
    </div>
  );
};

export default AboutRoute;
