import { userService } from '../services/user.service';
import { history } from '../helper/history';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode'
import consts from '../constants';

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

function login(usuario, senha) {

  return dispatch => (
    userService.login(usuario, senha)
    .then(
      data => {
        const token = data.data.accessToken;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
        history.push('/');
      },
      error => {
        dispatch(failure(error));
      }
    )
  );

  function failure(error) {
    return {
      type: 'LOGIN_FAILURE',
      error
    }
  }
}

function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loginData');
    localStorage.removeItem('clienteData');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    history.push('/');
  }
}