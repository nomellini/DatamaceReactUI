import React from 'react';
import classnames from 'classnames';
import { userActions } from '../actions/user.actions'


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
    this.handleChange = this.handleChange.bind(this);
    this.handleMasterCh = this.handleMasterCh.bind(this);
  }

  onSubmit(event) {

    this.setState(
      {
        message: '',
        errors: []
      }
    )

    event.preventDefault();
    userActions.gravarUsuario(this.state)
    .then(
      (res) => {
        this.props.updateApp(this.state);
      },
      (err) => {
        this.setState({ temErros: true });

        if (err.message === "Network Error") {
          // message no state é apenas desta tela
          this.setState({ message: 'Servidor não encontrado', isLoading: false })
          return;
        }
        this.setState(
          {
            errors: err.response.data.errors,
            message: err.response.data.message,
            isLoading: false
          }
        )

      }
    )
  }


  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleMasterCh(event)
  {
    const { target } = event;
    this.handleChange(event);

    let CodigoPerfil = "1"

    if (target.checked) {
      CodigoPerfil = "2"
    }

    this.setState(
      {CodigoPerfil}
    )

  }

  handleChange(event) {
    const { target } = event;
    if (target.checked) {
      target.removeAttribute('checked');
    } else {
      target.setAttribute('checked', true);
    }
    this.setState({ [target.name]: event.target.checked });
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


        <div className={classnames(
          { 'ApiClienteOk': this.state.status },
          { 'ApiClienteFailure': !this.state.status }
        )}>
          <div className={classnames('form-group', { 'has-error': this.state.errors.Status })}>
            <input
              type="checkbox"
              name="status"
              id="inputStatus"
              onClick={this.handleChange}
              checked={this.state.status}
              defaultChecked={this.state.status} />
            <label htmlFor="inputStatus"> Usuário {this.state.status ? " Ativo " : " Inativo "}</label>
          </div >
        </div >


            <input
              type="checkbox"
              name="Master"
              id="inputMaster"
              onClick={this.handleMasterCh}
              checked={this.state.Master}
              defaultChecked={this.state.Master} />
            <label htmlFor="inputMaster">Master</label>


        <div className="login-btn-enviar">
          <button disabled={this.state.isLoading} className="btn btn-primary" type="submit">Gravar</button>
        </div>

      </form>
    );
  }

}