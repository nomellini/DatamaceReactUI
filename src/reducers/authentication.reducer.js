import  consts  from '../constants';
import isEmpty from 'lodash/isEmpty'

//let loginData = JSON.parse(localStorage.getItem('loginData'));

const initialState =
{
  isAuthenticated: false,
  user: {}
}

export function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case consts.SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case consts.LOGIN_SUCCESS:
      return {
        isLogged: true,
        usuario: action.usuario,
        token: action.data.accessToken,
        message: action.data.message
      };
    case 'LOGIN_FAILURE':
      return {
        isLogged: false,
        usuario: action.usuario,
        token: '',
        message: action.error.message
      };

    case 'LOGOUT':
      return { isLogged: false };
    default:
      return state
  }
}