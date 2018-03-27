import { CLIENTE_API } from '../helper/apiConfig';
import { authHeader } from '../helper/auth-header';
import axios from 'axios';

export const clienteService = {
    getClientes,
    addCliente
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


function addCliente(cliente)
{
    return axios.post(CLIENTE_API, cliente);
    //     .then(
    //         res => console.log(res),
    //         err => console.log(err.response.data)
    // );
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