import consts from '../constants';

function fetchErrorReducer(state = null, action) {
  switch (action.type) {
    case consts.FETCHING:
    case consts.FETCH_SUCCESS:
      return null
    case consts.FETCHING_FAILURE:
      return action.message;
    default:
      return state
  }
}

function isFetchingReducer(state = false, action) {
  switch (action.type) {
    case consts.FETCHING:
      return true
    case consts.FETCH_DONE:
    case consts.SET_CURRENT_USER:
    case consts.FETCH_SUCCESS:
    case consts.GET_CLIENTE_SUCCESS:
    case consts.FETCHING_FAILURE:
      return false;
    default:
      return state
  }
}

export { fetchErrorReducer, isFetchingReducer };