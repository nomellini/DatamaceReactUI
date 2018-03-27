import { clienteService } from '../services/cliente.service';
import consts from '../constants';

export const clienteActions = {
  getClientes
};

/*
  Faça sua ação real.
  No final dê um dispatch para que o Redux atualize o estado do App
*/


export function addCliente(cliente) {
  // vamos inserir o cliente usando a api.
  return dispatch => {
    return clienteService.addCliente(cliente);
  }
}


export function getClientes(pageIndex, pageSize) {
  return dispatch => {
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