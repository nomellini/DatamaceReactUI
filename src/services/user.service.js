import { AUTH_API } from '../helper/apiConfig';
import axios from 'axios';
import store from '../redux/store';

export const userService = {
    login,
    isLogged,
    isMaster
};

function isMaster() {
    const state = store.getState();
    const { role } = state.auth.user;
    const index = role.indexOf("Master1");
    return !(index === -1);
}


function login(usuario, senha) {
    const body = JSON.stringify({ usuario, senha });
    return axios.post(AUTH_API, body, {
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