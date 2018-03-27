import classnames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import { login } from '../actions/user.actions';
import { history } from '../helper/history';
import validateInput from '../validator/login';
import { addFlashMessage } from '../actions/flashMessages.actions';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      isLoading: false,
      usuario: '',
      senha: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }


  onChange(event) {
    event.preventDefault();
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { usuario, senha } = this.state;
    if (this.isValid()) {

      this.setState({ message: '', errors: {}, isLoading: true });

      this.props.login(usuario, senha).then(
        (res) => {
          this.props.addFlashMessage({
            type: 'success',
            text: `Login efetuado com sucesso (para fechar esta mensagem, clique no x)`
          });
          history.push('/');
        },


        (err) => this.setState({ message: err.response.data.message, isLoading: false })
      );
    }
  }

  render() {

    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return <div className="row">
      <div className="col-md-12">
        <form onSubmit={this.onSubmit}>

          <h1>Login</h1>

          {this.state.message && <div className="alert alert-danger">{this.state.message}</div>}

          <div className={classnames('form-group', { 'has-error': this.state.errors.usuario })}>
            <label htmlFor="usuario">Usuario</label>
            <input className="form-control"
              onChange={this.onChange} type="text" value={this.state.usuario} name="usuario">
            </input>
            {this.state.errors.usuario && <span className="help-block">{this.state.errors.usuario}</span>}
          </div>


          <div className={classnames('form-group', { 'has-error': this.state.errors.senha })}>
            <label htmlFor="senha">Senha</label>
            <input className="form-control"
              onChange={this.onChange} type="password" value={this.state.senha} name="senha">
            </input>
            {this.state.errors.senha && <span className="help-block">{this.state.errors.senha}</span>}
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
  login: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, {login, addFlashMessage})(LoginPage);
