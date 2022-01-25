import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import TermView from '../../../components/term/TermView/TermView';

const TermViewRoute = () => {
  const [termId, term, savedQuery, error] = useOutletContext();

  return (
    <>
      <Helmet>
        <title>
          {term?.names[0] || savedQuery || termId} - Słownik Biologiczny
        </title>
      </Helmet>
      <TermView term={term} />
    </>
  );
};

export default TermViewRoute;
