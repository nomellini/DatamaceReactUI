import { clienteService } from '../services/cliente.service';

export const clienteActions = {
  getClientes,
  logout
};


function logout() {
  return { type: 'LOGOUT_CLIENTE' };
}

function getClientes(pageIndex, pageSize)
{
  return dispatch =>
  {
    clienteService.getClientes(pageIndex, pageSize)
      .then(
        data => {
          dispatch(success(data, pageIndex, pageSize));
        },
        error => {
          dispatch({
            type: 'GET_CLIENTE_FAILURE',
            message: error || "Algo deu errado"
          })
        }
      )
  }


  function success(data) {
    return {
      type: 'GET_CLIENTE_SUCCESS',
      clientes: data,
      pageIndex,
      pageSize,
      totalPages: 10
    }
  }
}