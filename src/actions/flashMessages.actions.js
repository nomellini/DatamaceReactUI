import consts from '../constants'

export function addFlashMessage(message) {
  return {
    type: consts.ADD_FLASH_MESSAGE,
    message
  }
}

export function deleteFlashMessage(id) {
  return {
    type: consts.DELETE_FLASH_MESSAGE,
    id
  }
}
