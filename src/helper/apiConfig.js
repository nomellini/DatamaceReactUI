let _root_api = ''
if (process.env.NODE_ENV === 'production')
{
   _root_api = 'http://portalmobile.rhnet.com.br/api/api/v1'; // servidor de produção
}
else
{
  _root_api = 'http://dtmweb/DtmMobileDatamaceWebApi/api/v1';
}

const ROOT_API = _root_api;
const AUTH_API = ROOT_API + '/Authentication';
const USUARIO_API = ROOT_API + '/Usuario';
const CLIENTE_API = ROOT_API + '/Cliente';
const APP_API = ROOT_API + '/Aplicativo'

const APP_AUTORIZACOES = APP_API + '/GetAutorizacoes'

const USUARIO_ZERASENHA = USUARIO_API + '/ZerarSenha';
const USUARIO_NOVASENHA = USUARIO_API + '/NovaSenha';

const CLIENTE_LICENCA = ROOT_API + '/Licenca';
const CLIENTE_API_TESTE = CLIENTE_API + '/CheckConnetion'

module.exports = {
  ROOT_API,
  AUTH_API,
  APP_API,
  USUARIO_API,

  APP_AUTORIZACOES,

  CLIENTE_API,
  CLIENTE_LICENCA,
  CLIENTE_API_TESTE,

  USUARIO_ZERASENHA,
  USUARIO_NOVASENHA
};
