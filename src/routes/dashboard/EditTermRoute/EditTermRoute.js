import { useParams } from 'react-router-dom';

const EditTermRoute = () => {
  const { termId } = useParams();

  return "edit term " + termId;
};

export default EditTermRoute;
