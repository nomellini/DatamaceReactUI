import { clienteService } from '../services/cliente.service';

export const clienteActions = {
  getClienteById,
  getClientes,
  addCliente,
  testarApiPorIdCliente,
  aplicarLicencaPorIdCliente
};

export function getClienteById(Id) {
  return clienteService.getClienteById(Id);
}

export function testarApiPorIdCliente(Id) {
  return clienteService.testarApiPorIdCliente(Id);
}

export function aplicarLicencaPorIdCliente(Id) {
  return clienteService.aplicarLicencaPorIdCliente(Id);
}


export function addCliente(cliente) {
  return clienteService.addCliente(cliente);
}


export function getClientes() {
  return clienteService.getClientes();
}
