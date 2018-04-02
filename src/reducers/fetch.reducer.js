import consts from '../constants';

function fetchErrorReducer(state = [], action) {
  switch (action.type) {
    case consts.FETCH_REQUEST:
    case consts.FETCH_SUCCESS:
      return []
    case consts.FETCH_FAILURE:
      return action.errors;
    default:
      return state
  }
}

function isFetchingReducer(state = false, action) {
  switch (action.type) {
    case consts.FETCH_REQUEST:
      return true;
    case consts.FETCH_SUCCESS:
    case consts.FETCH_FAILURE:
      return false;
    default:
      return state
  }
}

function fetchMessageReducer(state = '', action) {
  switch (action.type) {
    case consts.FETCH_REQUEST:
    case consts.FETCH_SUCCESS:
      return "";
    case consts.FETCH_FAILURE:
      return action.message;
    default:
      return state
  }
}

export { fetchErrorReducer, isFetchingReducer, fetchMessageReducer };