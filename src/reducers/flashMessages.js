
import {
  LOGOUT_USER,
  ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE,
  DELETE_ALL_FLASH_MESSAGE } from '../constants';

import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {
  switch(action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ];

    case LOGOUT_USER:
    case DELETE_ALL_FLASH_MESSAGE:
      return [];

    case DELETE_FLASH_MESSAGE:
      const index = findIndex(state, { id: action.id });
      if (index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }
      return state;

    default: return state;
  }
}
