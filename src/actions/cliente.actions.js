import { clienteService } from '../services/cliente.service';
import consts from '../constants';
import store from '../redux/store';

export const clienteActions = {
  getClientes,
  addCliente,
  testarApiPorIdCliente
};

// function FakeApiReturnClientes() {

//   let clientes = [];
//   for (let index = 1; index <= 10; index++) {
//     const element = {
//       codigo: index,
//       nome: `Cliente nome ${index}`,
//       descricao: `descrição do cliente ${index}`,
//       cnpj: '123.222.331-0001/12',
//       status: Math.random() < .8 ? true : false
//     }
//     clientes.push(element);

//   }

//   return new Promise((resolve) => {

//     const cliente = clientes;

//     store.dispatch({
//       type: consts.GET_CLIENTE_SUCCESS,
//       clientes: cliente
//     })
//     resolve(cliente);
//   })
// }


export function testarApiPorIdCliente(Id) {
  return clienteService.testarApiPorIdCliente(Id);
}

export function addCliente(cliente) {
  return clienteService.addCliente(cliente);
}


export function getClientes() {
//  return clienteService.getClientes();

  //return FakeApiReturnClientes();
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
