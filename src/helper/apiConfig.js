
const ROOT_API = 'http://192.168.0.105/teste/api/v1/';
//const ROOT_API = 'http://localhost:49713/api/v1/';
const AUTH_API = ROOT_API + 'Autentication';
const CLIENTE_API = ROOT_API + 'Cliente';
const CLIENTE_API_TEST = CLIENTE_API + '/CheckConnetion'

module.exports = {
  ROOT_API,
  AUTH_API,
  CLIENTE_API,
  CLIENTE_API_TEST
};