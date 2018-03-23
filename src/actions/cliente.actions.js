import { clienteService } from '../services/cliente.service';
import consts from '../constants';

export const clienteActions = {
  getClientes,
  logout
};

function logout() {
  return { type: consts.LOGOUT_CLIENTE };
}

function getClientes(pageIndex, pageSize) {
  return dispatch => {
    dispatch({ type: consts.GET_CLIENTE_REQUEST });
    clienteService.getClientes(pageIndex, pageSize)
      .then(
        data => {
          dispatch(success(data, pageIndex, pageSize));
        },
        error => {
          dispatch({
            type: consts.FETCHING_FAILURE,
            message: error || "Algo deu errado"
          })
        }
      )
  }


  function success(data) {
    return {
      type: consts.GET_CLIENTE_SUCCESS,
      clientes: data,
      pageIndex,
      pageSize,
      totalPages: 10
    }
  }
}