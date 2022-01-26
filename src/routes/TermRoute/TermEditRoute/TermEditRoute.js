import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import TermForm from '../../../components/term/TermForm/TermForm';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/slices/user';
import styles from './TermEditRoute.module.css'

const TermEditRoute = () => {
  const [termId, term, savedQuery] = useOutletContext();
  const user = useSelector(getUser);

  return (
    <>
      <Helmet>
        <title>
          {term?.names[0] || savedQuery || termId} - Słownik Biologiczny
        </title>
      </Helmet>
      { user ? <TermForm term={term} /> : <h2 className={styles.warning}> Musisz być zalogowany. </h2>}
      
    </>
  );
};

export default TermEditRoute;
