import { AUTH_API, USUARIO_ZERASENHA, USUARIO_NOVASENHA } from '../helper/apiConfig';
import axios from 'axios';
import store from '../redux/store';

export const userService = {
    login,
    NovaSenha,
    zeraSenha,
    isLogged,
    isMaster
};

function isMaster() {
    const state = store.getState();
    const { role } = state.auth.user;
    const index = role.indexOf("Master");
    return !(index === -1);
}


function login(usuario, senha) {
    const body = JSON.stringify({ usuario, senha });
    return axios.post(AUTH_API, body, {
        headers: { 'Content-Type': 'application/json' }
    });
}

function NovaSenha(state)
{
    const body = JSON.stringify(state);
    console.log(body);
    return axios.post(USUARIO_NOVASENHA, body, {
        headers: { 'Content-Type': 'application/json' }
    });
}

function zeraSenha(usuario)
{
    //const body = JSON.stringify({ usuario });
    return axios.post(USUARIO_ZERASENHA, usuario, {
        headers: { 'Content-Type': 'application/json' }
    });
}

function isLogged() {
    if (localStorage.jwtToken) {
        return true;
    }
    else
        return false;
}