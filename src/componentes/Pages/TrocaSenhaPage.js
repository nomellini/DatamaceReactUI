import React from 'react';
import classnames from 'classnames';
import { userActions } from '../../actions/user.actions';
import LogoDatamace from '../../img/LogoDatamace.png'
import { history } from '../../helper/history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class TrocaSenhaPage extends React.Component {

constructor(props) {

  super(props);


  this.state = {
    errors: {},
    isValid: true,
    isLoading: false,
    senha: '',
    key: this.props.match.params.Token,
    senhaConfirmacao: ''
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
  this.setState(
    {
      temErros: false,
      message: '',
      errors: {},
      isLoading: false
    }
  );

  userActions.NovaSenha(this.state).then(
    (res) => {
      history.replace('/Login/NovoLogin');
    },
    (err) => {
      this.setState({ temErros: true });

      if (err.message === "Network Error") {
        // message no state é apenas desta tela
        toast.error('Servidor não encontrado');
        this.setState({ isLoading: false })
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
  )

  // userActions.novaSenha(token, senha, confirma).then(
  //   (res) => {
  //   },
  //   (err) => {

  //     this.setState({ temErros: true });

  //     if (err.message === "Network Error") {
  //       // message no state é apenas desta tela
  //       this.setState({ message: 'Servidor não encontrado', isLoading: false })
  //       return;
  //     }
  //     this.setState(
  //       {
  //         errors: err.response.data.errors,
  //         message: err.response.data.message,
  //         isLoading: false
  //       }
  //     )
  //   }
  // );
}


render() {
  return <div className={classnames('loginContainer', { 'fieldAnimate': this.state.message })} >

    <div className="loginForm">
      <form onSubmit={this.onSubmit}>

        <div className="login-bem-vindo">
          <h3>Bem vindo ao<br />
            <strong><span className="blue">Datamace</span> Mobile</strong></h3>
        </div>

        <h2>Favor cadastrar uma nova senha</h2>

        <div className={classnames('form-group', { 'fieldAnimate has-error': this.state.errors.senha })}>
          <label htmlFor="inputSenha">Nova Senha</label>
          <input className="form-control" id="inputSenha"
            onChange={this.onChange} type="password" value={this.state.senha} name="senha">
          </input>
          {this.state.errors.Senha && <span className="help-block">{this.state.errors.Senha}</span>}
        </div>


        <div className={classnames('form-group', { 'fieldAnimate has-error': this.state.errors.SenhaConfirmacao })}>
          <label htmlFor="inputConfirma">Confirma nova senha</label>
          <input
            className="form-control"
            id="inputConfirma"
            onChange={this.onChange}
            type="password"
            value={this.state.senhaConfirmacao}
            name="senhaConfirmacao">
          </input>
          {this.state.errors.SenhaConfirmacao && <span className="help-block">{this.state.errors.SenhaConfirmacao}</span>}
        </div>

        <div className="login-btn-enviar">
          <img src={LogoDatamace} alt="Logotipo Datamace" />
          <button disabled={this.state.isLoading} className="btn btn-primary" type="submit">Gravar</button>
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