import { APP_API } from '../helper/apiConfig';
//import { authHeader } from '../helper/auth-header';
//import findIndex from 'lodash/findIndex';
import axios from 'axios';


export const appService = {
  gravaApp
};

export function gravaApp(app) {
  let funcao;
  if ((!app.codigo) || (app.codigo === 0))
    funcao = axios.post;
  else
    funcao = axios.put;
  return funcao(APP_API, app)
}