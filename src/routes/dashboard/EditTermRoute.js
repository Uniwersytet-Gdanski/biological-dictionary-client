import { useParams } from 'react-router-dom';

const EditTermRoute = () => {
  const { termCode } = useParams();

  return "edit term " + termCode;
};

export default EditTermRoute;
