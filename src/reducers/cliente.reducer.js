import consts from '../constants';

// const INITIAL_STATE = {
//   clientes: [],
//   pageIndex: 1,
//   totalPages: 10,
//   pageSize: 10
// };

const initialState = {
  clientes: [],
  pageIndex: 1,
  totalPages: 10,
  pageSize: 10
};
// let clienteData = JSON.parse(localStorage.getItem('clienteData'));

// const initialState =
//   clienteData ? {
//     clientes: clienteData.clientes,
//     pageIndex: clienteData.pageIndex,
//     pageSize: clienteData.pageSize
//   } : INITIAL_STATE;

export function clienteReducer(state = initialState, action) {
  switch (action.type) {
    case consts.GET_CLIENTE_REQUEST:
      return state
    case consts.GET_CLIENTE_SUCCESS:
      return {
        clientes: action.clientes,
        totalPages: action.totalPages,
        pageIndex: action.pageIndex,
        pageSize: action.pageSize
      }
    case consts.FETCHING_FAILURE:
      return false;
    case consts.LOGOUT_USER:
      return {}
    default:
      return state
  }
}