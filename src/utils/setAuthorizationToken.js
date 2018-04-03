import axios from 'axios';

export default function setAuthorizationToken(token)
{
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}