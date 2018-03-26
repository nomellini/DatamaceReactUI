import { AUTH_API } from '../helper/apiConfig';
import  axios  from 'axios';

export const userService = {
    login,
    isLogged
};

//axios.defaults.headers.common['Content-Type'] = 'application/json';

function login(usuario, senha) {
    const body = JSON.stringify({ usuario, senha });
    return axios.post(AUTH_API, body, {
        headers: { 'Content-Type' : 'application/json'}
    });
}

function isLogged() {

    if (localStorage.jwtToken) {
        return true;
    }
    else
        return false;
}