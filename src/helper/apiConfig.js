let _root_api = ''
if (process.env.NODE_ENV === 'production')
{
   _root_api = 'http://www.rhnet.com.br:3000/api/api/v1'; // servidor de produção
 //  _root_api = 'http://201.72.232.228/DtmMobileDatamaceWebApi/api/v1'; // Local IIS
}
else
{
  _root_api = 'http://dtmweb/DtmMobileDatamaceWebApi/api/v1'; // Local IIS
  //_root_api = 'http://localhost:49713/api/v1'; // Local Debug
}

const ROOT_API = _root_api;
const AUTH_API = ROOT_API + '/Authentication';
const USUARIO_API = ROOT_API + '/Usuario';
const CLIENTE_API = ROOT_API + '/Cliente';
const APP_API = ROOT_API + '/Aplicativo'

const USUARIO_ZERASENHA = USUARIO_API + '/ZerarSenha';
const USUARIO_NOVASENHA = USUARIO_API + '/NovaSenha';

const CLIENTE_LICENCA = ROOT_API + '/Licenca';
const CLIENTE_API_TESTE = CLIENTE_API + '/CheckConnetion'

module.exports = {
  ROOT_API,
  AUTH_API,
  APP_API,
  USUARIO_API,

  CLIENTE_API,
  CLIENTE_LICENCA,
  CLIENTE_API_TESTE,

  USUARIO_ZERASENHA,
  USUARIO_NOVASENHA
};