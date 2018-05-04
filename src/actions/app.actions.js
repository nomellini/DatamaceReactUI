import { appServices } from '../services/app.service'

export function getAutorizacoes() {
  return appServices.getAutorizacoes();
}