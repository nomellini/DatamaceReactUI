import consts from '../helper/apiConfig';
import axios from 'axios';
import store from '../redux/store';

export const userService = {
    login,
    NovaSenha,
    zeraSenha,
    isLogged,
    isMaster,
    obterUsuarios,
    gravarUsuario
};


export function gravarUsuario(user)
{
    const body = JSON.stringify(user);
    return axios.post("", body, {
        headers: { 'Content-Type': 'application/json' }
    });
}

export function obterUsuarios()
{
    return axios.get(consts.USUARIO_API);
}

function isMaster() {
    const state = store.getState();
    const { role } = state.auth.user;
    const index = role.indexOf("Master");
    return !(index === -1);
}


function login(usuario, senha) {
    const body = JSON.stringify({ usuario, senha });
    return axios.post(consts.AUTH_API, body, {
        headers: { 'Content-Type': 'application/json' }
    });
}

function NovaSenha(state)
{
    const body = JSON.stringify(state);
    return axios.post(consts.USUARIO_NOVASENHA, body, {
        headers: { 'Content-Type': 'application/json' }
    });
}

function zeraSenha(usuario)
{
    return axios.post(consts.USUARIO_ZERASENHA, usuario, {
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