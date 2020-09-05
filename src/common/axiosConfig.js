import axios from 'axios';
import store from './store';

const apiUrl = process.env.REACT_APP_API_URL;

const api = () => {
  const root = JSON.parse(localStorage.getItem('persist:root'));
  const { auth } = store.getState();
  let headers;
  if (auth.headers.Authorization !== '') {
    headers = auth.headers;
  } else {
    if (root) {
      headers = JSON.parse(root.auth).headers;
    }
  }
  
  headers.App = 'osa-webportal';
  console.log(headers);

  const api = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers,
    withCredentials: true,
  });

  return api;
};

export default api;
