import React from 'react';
import classnames from 'classnames';
import { Redirect } from "react-router-dom";
import { userActions } from '../../actions/user.actions';
import { history } from '../../helper/history';
import LogoDatamace from '../../img/LogoDatamace.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    this.onEsqueci = this.onEsqueci.bind(this);
  }


  componentDidMount()
  {
    if (this.props.match.params.NovoLogin)
    {
      toast.info('Efetuar seu login com a nova senha cadastrada');
    }
  }

  onEsqueci()
  {
    if (this.state.usuario) {
      userActions.zeraSenha(this.state.usuario).then(
        (res) => {
          toast.success(`${this.state.usuario}, Verifique seu email`);
        },
        (err) =>
        {
          this.setState({ temErros: true });
          if (err.message === "Network Error") {
            toast.error('Servidor não encontrado');
            this.setState({isLoading: false});
            return;
          }
          toast.error(`Erro na api: ${err.response.statusText}`);
          this.setState({isLoading: false});
        }
      )


    } else {
      toast.error(`Digitar o usuário`);
    }
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

    userActions.login(usuario, senha).then(
      (res) => {
        history.replace('/');
      },
      (err) => {

        this.setState({ temErros: true });

        if (err.message === "Network Error") {
          // message no state é apenas desta tela
          toast.error('Servidor não encontrado');
          this.setState({isLoading: false })
          return;
        }
        if (err.response.data.message)
          toast.error(err.response.data.message);
        this.setState(
          {
            errors: err.response.data.errors,
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

          <div className="login-bem-vindo">
            <h3>Bem vindo ao<br />
              <strong><span className="blue">Datamace</span> Mobile</strong></h3>
          </div>

          <p>Favor inserir seu login e sua senha</p>

          {this.state.message && <div className="alert alert-danger">{this.state.message}</div>}

          <div className={classnames('form-group', { 'fieldAnimate has-error': this.state.errors.Usuario })}>
            <label htmlFor="inputUsuario">Usuario</label>
            <input className="form-control" id="inputUsuario"
              onChange={this.onChange} type="text" value={this.state.usuario} name="usuario">
            </input>
            {this.state.errors.Usuario && <span className="help-block">{this.state.errors.Usuario}</span>}
          </div>


          <div className={classnames('form-group', { 'fieldAnimate has-error': this.state.errors.Senha })}>
            <label htmlFor="inputSenha">Senha</label>
            <input className="form-control" id="inputSenha"
              onChange={this.onChange} type="password" value={this.state.senha} name="senha">
            </input>
            {this.state.errors.Senha && <span className="help-block">{this.state.errors.Senha}</span>}
          </div>

          <div className="login-btn-enviar">
            <img src={LogoDatamace} alt="Logotipo Datamace"/>
            <button disabled={this.state.isLoading} className="btn btn-primary" type="submit">Logar</button>
          </div>

          <div className="login-btn-enviar">
            <a onClick={this.onEsqueci} href="#">Esqueci minha senha</a>
          </div>

        </form>

      </div>

      <ToastContainer
        autoClose={2500}
        hideProgressBar={true}
      />
    </div>;
  }
}

export default LoginPage;

