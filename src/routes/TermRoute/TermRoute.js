import { useParams } from 'react-router-dom';

const TermRoute = () => {
  const { termCode } = useParams();

  return "term " + termCode;
};

export default TermRoute;
