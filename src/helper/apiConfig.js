let _root_api = ''
if (process.env.NODE_ENV === 'production')
{
   _root_api = 'http://dtmweb/DtmMobileDatamaceWebApi/api/v1'; // Local IIS
}
else
{
  _root_api = 'http://dtmweb/DtmMobileDatamaceWebApi/api/v1'; // Local IIS
  //_root_api = 'http://localhost:49713/api/v1'; // Local Debug
}

const ROOT_API = _root_api;
const AUTH_API = ROOT_API + '/Authentication';
const CLIENTE_API = ROOT_API + '/Cliente';
const CLIENTE_API_TESTE = CLIENTE_API + '/CheckConnetion'
const APP_API = ROOT_API + '/Aplicativo'

module.exports = {
  ROOT_API,
  AUTH_API,
  CLIENTE_API,
  CLIENTE_API_TESTE,
  APP_API
};