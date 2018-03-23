import { userService } from '../services/user.service';
import { history } from '../helper/history';

export const userActions = {
  login,
  logout
};

function login(usuario, senha) {

  return dispatch => (
  userService.login(usuario, senha)
    .then(
      data => {
        dispatch(success(usuario, data));
        history.push('/');
      },
      error => {
        dispatch(failure(error));
      }
    )
  );

  function success(usuario, data) {
    return {
      type: 'LOGIN_SUCCESS',
      usuario: usuario,
      data: data
    }
  }

  function failure(error) {
    return {
      type: 'LOGIN_FAILURE',
      error
    }
  }
}

function logout() {
  userService.logout();
  return { type: 'LOGOUT' };
}