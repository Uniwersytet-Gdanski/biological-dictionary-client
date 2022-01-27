import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../axiosClient';
import { getUser, setUser } from '../../redux/slices/user';

export const performLogout = (dispatch) => {
  axiosClient.post(`/logout`)
    .then(_ => {
      console.log("logout successful");
      dispatch(setUser(null));
    }).catch(ex => {
    console.error(ex);
    alert("Logout failed");  // TODO: better error handling
  });
};

const useLogoutCommand = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUser);

  const canBeRun = user != null;
  const handleExecute = () => {
    performLogout(dispatch);
  };
  return { name: 'logout', canBeRun, handleExecute };
};

export default useLogoutCommand;
