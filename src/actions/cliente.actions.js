import { clienteService } from '../services/cliente.service';
import consts from '../constants';
import store from '../redux/store';

export const clienteActions = {
  getClientes
};

/*
  Faça sua ação real.
  No final dê um dispatch para que o Redux atualize o estado do App
*/
export function addCliente(cliente) {
  return clienteService.addCliente(cliente);
}


export function getClientes(pageIndex, pageSize) {
  return clienteService.getClientes(pageIndex, pageSize)
    .then(
      data => {
        store.dispatch(success(data, pageIndex, pageSize));
      }
    )
}


function success(data, pageIndex, pageSize) {
  return {
    type: consts.GET_CLIENTE_SUCCESS,
    clientes: data,
    pageIndex: pageIndex,
    pageSize: pageSize
  }
}
