import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet';

const TermRoute = () => {
  const {termCode} = useParams();

  return (
      <div>
        <Helmet>
          <title>{termCode} - Słownik Biologiczny</title> {/* TODO replace with name */}
        </Helmet>
        term {termCode}
      </div>
  );
};

export default TermRoute;
