export function fetchErrorReducer(state = null, action) {
  switch (action.type) {
    case 'GET_CLIENTE_FAILURE':
    return action.message;
    case 'LOGOUT_CLIENTE':
    case 'GET_CLIENTE_SUCCESS':
      return null
    default:
      return state
  }
}