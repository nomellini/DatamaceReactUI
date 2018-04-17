import { userService } from '../services/user.service';
import { history } from '../helper/history';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode'
import consts from '../constants';
import store from '../redux/store';

export const userActions = {
  login,
  logout
};



export function setCurrentUser(user) {
  return {
    type: consts.SET_CURRENT_USER,
    user
  };
}

export function login(usuario, senha) {
  //return FakeApiReturnUser();
  return userService.login(usuario, senha).then(res => {
    const token = res.data.accessToken;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    store.dispatch(setCurrentUser(jwtDecode(token)));
  })
}

function logout() {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('clienteData');
  setAuthorizationToken(false);
  store.dispatch(setCurrentUser({}));
  store.dispatch({
    type: consts.LOGOUT_USER,
  })
  history.replace('/Login');
}