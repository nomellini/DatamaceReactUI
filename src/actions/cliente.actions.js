import { clienteService } from '../services/cliente.service';
import consts from '../constants';
import store from '../redux/store';

export const clienteActions = {
  getClientes,
  addCliente,
  testarApiPorIdCliente
};

function FakeApiReturnClientes() 
{
  return new Promise((resolve) =>{
    const cliente = 
      [
        {
          codigo: 1,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12'
        },
        {
          codigo: 2,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        },
        {
          codigo: 3,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        },
        {
          codigo: 4,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        },
        {
          codigo: 5,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        },
        {
          codigo: 6,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        },
        {
          codigo: 7,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        },
        {
          codigo: 8,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        },
        {
          codigo: 9,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        },
        {
          codigo: 10,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        },
        {
          codigo: 11,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        },
        {
          codigo: 12,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        },
        {
          codigo: 13,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        },
        {
          codigo: 14,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        },
        {
          codigo: 15,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        },
        {
          codigo: 16,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        },
        {
          codigo: 17,
          nome: 'Fernando',
          descricao: 'descrição',
          cnpj : '123.222.331-0001/12',
          codigoSad : '12D2018',
          status: true
        }
      ]
      ;      
      store.dispatch({
        type: consts.GET_CLIENTE_SUCCESS,
        clientes: cliente
      })
    resolve(cliente);
  })
}

export function testarApiPorIdCliente(Id) {
  return clienteService.testarApiPorIdCliente(Id);
}

export function addCliente(cliente) {
  return clienteService.addCliente(cliente);
}

export function getClientes() {
  return FakeApiReturnClientes();
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
