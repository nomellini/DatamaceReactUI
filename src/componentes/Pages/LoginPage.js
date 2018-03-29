import classnames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import { login } from '../../actions/user.actions';
import { history } from '../../helper/history';
import { Mensagens } from '../../actions/flashMessages.actions';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      isValid: true,
      isLoading: false,
      usuario: '',
      senha: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { usuario, senha } = this.state;

    this.setState({ temErros: false, message: '', errors: {}, isLoading: true });

    this.props.login(usuario, senha).then(
      (res) => {
        Mensagens.addFlashMessageSucesso(`Login efetuado com sucesso (para fechar esta mensagem, clique no x)`);
        history.push('/');
      },
      (err) => {

        this.setState({ temErros: true});

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
    );
  }


  render() {

    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return <div className={classnames('loginContainer', { 'fieldAnimate': this.state.message })} >

      <div className="loginForm">
        <form onSubmit={this.onSubmit}>

          <h1>Login</h1>

          {this.state.message && <div className="alert alert-danger">{this.state.message}</div>}

          <div className={classnames('form-group', { 'fieldAnimate has-error': this.state.errors.Usuario })}>
            <label htmlFor="usuario">Usuario</label>
            <input className="form-control"
              onChange={this.onChange} type="text" value={this.state.usuario} name="usuario">
            </input>
            {this.state.errors.Usuario && <span className="help-block">{this.state.errors.Usuario}</span>}
          </div>


          <div className={classnames('form-group', { 'fieldAnimate has-error': this.state.errors.Senha })}>
            <label htmlFor="senha">Senha</label>
            <input className="form-control"
              onChange={this.onChange} type="password" value={this.state.senha} name="senha">
            </input>
            {this.state.errors.Senha && <span className="help-block">{this.state.errors.Senha}</span>}
          </div>


          <div className="form-group">
            <button disabled={this.state.isLoading} className="btn btn-primary" type="submit">Vai</button>
          </div>

        </form>

      </div>

    </div>;
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginPage);
