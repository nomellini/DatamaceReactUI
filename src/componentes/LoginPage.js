import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { userActions } from '../actions/user.actions';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: false, usuario: '', senha: '' };
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
    const { dispatch } = this.props;
    if (usuario && senha) {
      dispatch(userActions.login(usuario, senha));
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
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>

          <div className="form-group" >

            <label htmlFor="usuario">Usuario</label>
            <input className="form-control"
              onChange={this.onChange} type="text" value={this.state.usuario} name="usuario">
            </input>
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input className="form-control"
              onChange={this.onChange} type="password" value={this.state.senha} name="senha">
            </input>
          </div>
          <div className="form-group">
            <button disabled={this.state.loading} className="btn btn-primary" type="submit">Vai</button>
          </div>

        </form>

        <div>
          <pre>{this.props.message}</pre>
        </div>
      </div>
    </div>;
  }
}


function mapStateToProps(state) {
  const { message, token, usuario } = state.auth;
  return {
    message, token, usuario
  };
}

export default connect(mapStateToProps)(LoginPage);
