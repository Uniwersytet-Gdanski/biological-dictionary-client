import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axiosClient from '../axiosClient';
import { setUser } from '../redux/slices/user';

const useFetchProfileOnFirstLoad = () => {
  const dispatch = useDispatch();

  // source: https://stackoverflow.com/a/15724300/4541480
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  useEffect(() => {
    if (!getCookie('sessionId')) {
      // we are definitely not logged in
      return;
    }
    axiosClient.get(`/me`).then(response => {
      dispatch(setUser(response.data));
    }).catch(ex => {
      if (ex.isAxiosError && ex.response.status === 401) {
        // server says we are not logged in, ignore
      } else {
        console.error(ex);
      }
    });
  }, [dispatch]);
};

export default useFetchProfileOnFirstLoad;
