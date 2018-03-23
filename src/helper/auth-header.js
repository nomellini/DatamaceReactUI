export function authHeader() {
    // return authorization header with jwt token
    let loginData = JSON.parse(localStorage.getItem('loginData'));

    if (loginData && loginData.token) {
        return { 'Authorization': 'Bearer ' + loginData.token };
    } else {
        return {};
    }
}