import consts from '../constants';

function fetchErrorReducer(state = null, action) {
  switch (action.type) {
    case consts.FETCHING_FAILURE:
      return action.message;
    case consts.LOGOUT_CLIENTE:
    case consts.GET_CLIENTE_SUCCESS:
      return null
    default:
      return state
  }
}

function isFetchingReducer(state = false, action) {
  switch (action.type) {
    case consts.GET_CLIENTE_REQUEST:
      return true
    case consts.GET_CLIENTE_SUCCESS:
    case consts.FETCHING_FAILURE:
      return false;
    default:
      return state
  }
}

export { fetchErrorReducer, isFetchingReducer };