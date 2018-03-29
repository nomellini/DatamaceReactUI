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


export function getClientes() {
  return clienteService.getClientes()
    .then(
      res => {
        store.dispatch(success(res.data));
      }
    )
}


function success(data) {
  return {
    type: consts.GET_CLIENTE_SUCCESS,
    clientes: data
  }
}
