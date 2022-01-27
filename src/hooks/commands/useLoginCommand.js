import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../axiosClient';
import { getUser, setUser } from '../../redux/slices/user';

const useLoginCommand = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const canBeRun = user == null;
  const handleExecute = (login, password) => {
    axiosClient.post(`/login`, {
      login: login,
      password: password,
    }).then(response => {
      console.log("login successful");
      dispatch(setUser(response.data));
    }).catch(ex => {
      console.error(ex);
      alert("Login failed");  // TODO: better error handling
    });
  };
  return { name: 'login', canBeRun, handleExecute };
};

export default useLoginCommand;
