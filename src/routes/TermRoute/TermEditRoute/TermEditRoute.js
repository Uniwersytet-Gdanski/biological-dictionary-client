import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import TermForm from '../../../components/term/TermForm/TermForm';

const TermEditRoute = () => {
  const [termId, term, savedQuery] = useOutletContext();

  return (
    <>
      <Helmet>
        <title>
          {term?.names[0] || savedQuery || termId} - Słownik Biologiczny
        </title>
      </Helmet>
      <TermForm term={term} />
    </>
  );
};

export default TermEditRoute;
