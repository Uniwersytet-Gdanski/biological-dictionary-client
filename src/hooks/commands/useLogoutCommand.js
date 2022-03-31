import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../axiosClient';
import { getUser, setUser } from '../../redux/slices/user';
import { useState } from 'react';

export const performLogout = (dispatch, setError) => {
  axiosClient.post(`/logout`)
    .then(_ => {
      setError(null);
      console.log("logout successful");
      dispatch(setUser(null));
    }).catch(error => {
      if (error.isAxiosError) {
        if (error.response && error.response.status === 401) {
          setError("Nie jesteś zalogowany");
          console.log(error);
        } else {
          setError("Wystąpił błąd sieci")
          console.log(error);
        }
      } else {
        setError("Wystąpił błąd");
        console.log(error);
      }
  });
};

const useLogoutCommand = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const [error, setError] = useState(null);

  const canBeRun = user != null;
  const handleExecute = () => {
    performLogout(dispatch, setError);
  };
  return { name: 'logout', canBeRun, handleExecute, error };
};

export default useLogoutCommand;
