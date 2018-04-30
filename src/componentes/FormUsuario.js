
import React from 'react';

import classnames from 'classnames';

export default class FormUsuario extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      ...this.props.user,
      errors: [],
      message: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.updateUser(this.state);
  }


  onChange(event) {
    this.setState({ [event.target.key]: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className='form-aplicativo shaddow'>


        <div className={classnames('form-group', { 'fieldAnimate has-error': this.state.errors.Usuario })}>
          <label htmlFor="inputUsuario">Usuario (login)</label>
          <input
            className="form-control"
            id="inputUsuario"
            onChange={this.onChange}
            type="text"
            value={this.state.usuario}
            name="usuario">
          </input>
          {this.state.errors.Usuario && <span className="help-block">{this.state.errors.Usuario}</span>}
        </div>

        <div className={classnames('form-group', { 'fieldAnimate has-error': this.state.errors.Nome })}>
          <label htmlFor="inputNome">Nome</label>
          <input
            className="form-control"
            id="inputNome"
            onChange={this.onChange}
            type="text"
            value={this.state.nome}
            name="nome">
          </input>
          {this.state.errors.Nome && <span className="help-block">{this.state.errors.Nome}</span>}
        </div>

        <div className={classnames('form-group', { 'fieldAnimate has-error': this.state.errors.Email })}>
          <label htmlFor="inputEmail">Email</label>
          <input
            className="form-control"
            id="inputEmail"
            onChange={this.onChange}
            type="text"
            value={this.state.email}
            name="email">
          </input>
          {this.state.errors.Email && <span className="help-block">{this.state.errors.Email}</span>}
        </div>

        <div className="login-btn-enviar">
          <button disabled={this.state.isLoading} className="btn btn-primary" type="submit">Gravar</button>
        </div>

      </form>
    );
  }

}