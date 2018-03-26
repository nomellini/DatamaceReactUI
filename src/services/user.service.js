import { AUTH_API } from '../helper/apiConfig';
import  axios  from 'axios';

export const userService = {
    login,
    logout,
    isLogged
};


function login(usuario, senha) {
    const body = JSON.stringify({ usuario, senha });
    return axios.post(AUTH_API, body,{
        headers: {
            'Content-Type': 'application/json',
        }})
}

function logout() {
    localStorage.removeItem('loginData');
    localStorage.removeItem('clienteData');
}

function isLogged() {

    if (localStorage.jwtToken) {
        return true;
    }
    else
        return false;
}