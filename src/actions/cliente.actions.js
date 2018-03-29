import { clienteService } from '../services/cliente.service';
import consts from '../constants';
import store from '../redux/store';

export const clienteActions = {
  getClientes,
  addCliente
};

export function addCliente(cliente) {
  return clienteService.addCliente(cliente);
}

export function getClientes() {
  return clienteService.getClientes()
    .then(
      res => {
        store.dispatch({
          type: consts.GET_CLIENTE_SUCCESS,
          clientes: res.data
        });
      }
    )
}
