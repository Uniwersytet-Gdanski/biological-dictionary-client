import { Helmet } from 'react-helmet-async';
import Contact from '../../components/Contact/Contact';
import styles from './ContactRoute.module.css'

const ContactRoute = () => {
  return (
    <div className={styles.route}>
      <Helmet>
        <title> O słowniku - Słownik Biologiczny </title>
      </Helmet>
      <Contact />
    </div>
  );
};

export default ContactRoute;
