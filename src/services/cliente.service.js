import { CLIENTE_API, CLIENTE_API_TESTE } from '../helper/apiConfig';
//import { authHeader } from '../helper/auth-header';
import findIndex from 'lodash/findIndex';
import axios from 'axios';
import store from '../redux/store'


export const clienteService = {
    getClientes,
    addCliente,
    obterCliente,
    testarApiPorIdCliente,
    obterClientePorId
};

function getClientes() {
    return axios.get(CLIENTE_API);
}

function testarApiPorIdCliente(Id) {
    return axios.post(CLIENTE_API_TESTE, Id, {
        headers: { 'Content-Type': 'application/json' }
    });
}

function obterClientePorId(Id) {
    return axios.get(CLIENTE_API + "/" + Id);
}


function obterCliente(Id) {
    const state = store.getState();
    const clientes = state.cliente.clientes;
    const index = findIndex(clientes, function (o) { return o.codigo == Id; });
    return clientes[index];
}

function addCliente(cliente) {
    if (cliente.id === 0)
        return axios.post(CLIENTE_API, cliente);
    else
        return axios.put(CLIENTE_API, cliente);
}