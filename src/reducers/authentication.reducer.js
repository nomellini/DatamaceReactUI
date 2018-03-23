let loginData = JSON.parse(localStorage.getItem('loginData'));

const initialState = loginData ?  { message: '', usuario:loginData.usuario, token : loginData.token  }  : {};

export function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
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
      return {isLogged: false};
    default:
      return state
  }
}