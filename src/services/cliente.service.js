import { CLIENTE_API } from '../helper/apiConfig';
import { authHeader } from '../helper/auth-header';
import axios from 'axios';

export const clienteService = {
    getClientes
};

function getClientes(PageIndex, PageSize) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
        //,      body: JSON.stringify({ PageIndex, PageSize })
    };
    return axios.get(CLIENTE_API, requestOptions)
        .then(handleResponse)
}


function handleResponse(response) {
    storeClienteDataToLocalStore(response.data);
    return response.data;
}


function storeClienteDataToLocalStore(payload) {
    const clienteData = {
        clientes: payload
    };
    localStorage.setItem('clienteData', JSON.stringify(clienteData));
}