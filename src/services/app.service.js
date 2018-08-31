import { APP_API, APP_AUTORIZACOES } from "../helper/apiConfig";

import axios from "axios";

export const appService = {
  gravaApp,
  getAutorizacoes
};

export function getAutorizacoes() {
  return axios.get(APP_AUTORIZACOES);
}

export function gravaApp(app) {
  let funcao;
  if (!app.codigo || app.codigo === 0) funcao = axios.post;
  else funcao = axios.put;
  return funcao(APP_API, app);
}
