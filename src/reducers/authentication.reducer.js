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
    default:
      return state
  }
}