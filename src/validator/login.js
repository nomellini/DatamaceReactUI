import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.usuario)) {
    errors.usuario = 'Este campo é obrigatório';
  }

  if (Validator.isEmpty(data.senha)) {
    errors.senha = 'Este campo é obrigatório';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
