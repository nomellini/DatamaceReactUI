import React from 'react';
import classnames from 'classnames';
import { appService } from '../services/app.service'

export default class FormAplicativo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ...this.props.app,
      errors: [],
      message: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    const { target } = event;
    if (target.checked) {
      target.removeAttribute('checked');
    } else {
      target.setAttribute('checked', true);
    }
    this.setState({ status: event.target.checked });
  }


  onSubmit(event) {
    event.preventDefault();

    this.setState(
      {
        message: '',
        errors: []
      }
    )

    appService.gravaApp(this.state)
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
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className='form-aplicativo shaddow'>

        <div className={classnames('form-group', { 'fieldAnimate has-error': this.state.errors.Nome })}>
          <label htmlFor="nome">Nome</label>
          <input className="form-control" name="nome" onChange={this.onChange} type="text" value={this.state.nome} >
          </input>
          {this.state.errors.Nome && <span className="help-block">{this.state.errors.Nome}</span>}
        </div>

        <div className={classnames('form-group', { 'fieldAnimate has-error': this.state.errors.descricao })}>
          <label htmlFor="descricao">Descrição</label>
          <input className="form-control" name="descricao" onChange={this.onChange} type="text" value={this.state.descricao} >
          </input>
          {this.state.errors.descricao && <span className="help-block">{this.state.errors.descricao}</span>}
        </div>

        <div className={classnames('form-group', { 'fieldAnimate has-error': this.state.errors.Email })}>
          <label htmlFor="email">Email</label>
          <input className="form-control" name="email" onChange={this.onChange} type="text" value={this.state.email} >
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
              onClick={this.handleChange}
              checked={this.state.status}
              defaultChecked={this.state.status} />
          </div >
          <label htmlFor="input">App {this.state.status ? "Ativo" : "Inativo"}</label>
        </div >


        <div className="login-btn-enviar">
          <button disabled={this.state.isLoading} className="btn btn-primary" type="submit">Gravar</button>
        </div>

      </form>
    );
  }

}