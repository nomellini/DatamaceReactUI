import { CLIENTE_API } from '../helper/apiConfig';
//import { authHeader } from '../helper/auth-header';
import findIndex from 'lodash/findIndex';
import axios from 'axios';
import store from '../redux/store'


export const clienteService = {
    getClientes,
    addCliente,
    obterCliente,
};

function getClientes(PageIndex, PageSize) {
    return axios.get(CLIENTE_API);
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