import { userService } from '../services/user.service';
import { history } from '../helper/history';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode'
import consts from '../constants';
import store from '../redux/store';

export const userActions = {
  login,
  logout,
  zeraSenha,
  NovaSenha,
  obterUsuarios,
  gravarUsuario
};

export function gravarUsuario(user)
{
  return userService.gravarUsuario(user);
}

export function obterUsuarios()
{
  return userService.obterUsuarios();
}


export function setCurrentUser(user) {
  return {
    type: consts.SET_CURRENT_USER,
    user
  };
}

export function NovaSenha(state)
{
  return userService.NovaSenha(state);
}

export function zeraSenha(usuario)
{
  return userService.zeraSenha( `"${usuario}"` );
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