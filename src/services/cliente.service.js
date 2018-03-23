import {CLIENTE_API} from '../helper/apiConfig';
import { authHeader } from '../helper/auth-header';

export const clienteService = {
    getClientes
};

function getClientes(PageIndex, PageSize) {
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
      //,      body: JSON.stringify({ PageIndex, PageSize })
  };
  return fetch(CLIENTE_API, requestOptions)
  .then(handleResponse)
  .then(payload => {
    storeClienteDataToLocalStore(payload);
    return payload;
  })
}


function handleResponse(response) {
  if (!response.ok) {
      return Promise.reject(response.statusText);
  }
  return response.json();
}


function storeClienteDataToLocalStore(payload)
{
    const clienteData = {
        clientes: payload
   };
   localStorage.setItem('clienteData', JSON.stringify(clienteData));
}