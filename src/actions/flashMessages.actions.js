import consts from '../constants'
import store from '../redux/store'

export const Mensagens = {
  addFlashMessageSucesso,
  addFlashMessageErro
};

function addFlashMessage(message) {

  store.dispatch( {
    type: consts.ADD_FLASH_MESSAGE,
    message
  });
}

function addFlashMessageSucesso(Texto)
{
  const mensagem = {
    type: 'success',
    text: Texto
  };
  addFlashMessage(mensagem);
}

function addFlashMessageErro(Texto)
{
  const mensagem = {
    type: 'error',
    text: Texto
  };
  addFlashMessage(mensagem);
}

export function deleteFlashMessage(id) {
  return {
    type: consts.DELETE_FLASH_MESSAGE,
    id
  }
}
