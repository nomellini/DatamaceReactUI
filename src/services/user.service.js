import {AUTH_API} from '../helper/apiConfig';

export const userService = {
    login,
    logout,
    isLogged
};


function login(usuario, senha) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
    };


    return fetch(AUTH_API, requestOptions)
        .then(response => {
            //status = response.status;
            return response.json();
        })
        .then(data => {
            if (data && data.accessToken) {
                storeLoginDataToLocalStore(usuario, data);
                return data;
            } else {
                clearLoginDataOnLocalStore();
                return Promise.reject(data) ;
            }

        });
}

function logout() {
    localStorage.removeItem('loginData');
    localStorage.removeItem('clienteData');
}

function isLogged()
{
    let loginData = JSON.parse(localStorage.getItem('loginData'));
    if (loginData) {
        return true;
    }
    else
        return false;
}

function storeLoginDataToLocalStore(usuario, apiPayload)
{
    const loginData = {
         usuario: usuario,
         token: apiPayload.accessToken,
         message: apiPayload.message
    };
    localStorage.setItem('loginData', JSON.stringify(loginData));
}

function clearLoginDataOnLocalStore()
{
    localStorage.setItem('loginData', JSON.stringify({}));
}
