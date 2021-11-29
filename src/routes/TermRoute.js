import { useParams } from 'react-router-dom';

const TermRoute = () => {
  const { term } = useParams();

  return "term " + term;
};

export default TermRoute;
