import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../axiosClient';
import { getUser, setUser } from '../../redux/slices/user';
import { useState } from 'react';

const useLoginCommand = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const canBeRun = user == null;
  const handleExecute = (login, password) => {
    axiosClient.post(`/login`, {
      login: login,
      password: password,
    }).then(response => {
      setError(null);
      console.log("login successful");
      dispatch(setUser(response.data));
    }).catch(error => {
      if (error.isAxiosError) {
        if (error.response && error.response.status === 401) {
          setError("Nieprawidłowy login lub hasło");
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
  return { name: 'login', canBeRun, handleExecute, error };
};

export default useLoginCommand;
