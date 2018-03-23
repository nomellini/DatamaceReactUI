const INITIAL_STATE = {
  clientes: [],
  pageIndex: 1,
  totalPages: 10,
  pageSize: 10
};

let clienteData = JSON.parse(localStorage.getItem('clienteData'));

console.log(clienteData);

const initialState =
  clienteData ? {
    clientes: clienteData.clientes,
    pageIndex: clienteData.pageIndex,
    pageSize: clienteData.pageSize
  } : INITIAL_STATE;

export function clienteReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CLIENTE_SUCCESS':
      return {
        clientes: action.clientes,
        totalPages: action.totalPages,
        pageIndex: action.pageIndex,
        pageSize: action.pageSize
      }
    case 'GET_CLIENTE_FAILURE':
      return false;
    case 'LOGOUT_CLIENTE':
      return {}
    default:
      return state
  }
}