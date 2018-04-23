import React from 'react';
import classnames from 'classnames';
//import { userActions } from '../../actions/user.actions';
import LogoDatamace from '../../img/LogoDatamace.png'


export default class TrocaSenhaPage extends React.Component {

  constructor(props) {


    super(props);

    this.state = {
      errors: {},
      isValid: true,
      isLoading: false,
      confirma: '',
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
    //const { senha, confirma } = this.state;
    this.setState({ temErros: false, message: '', errors: {}, isLoading: true });


    //var token = this.props.match.params.pValue;

    console.log(this.props.match.params)

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

          <p>Favor cadastrar uma nova senha</p>

          {this.state.message && <div className="alert alert-danger">{this.state.message}</div>}

          <div className={classnames('form-group', { 'fieldAnimate has-error': this.state.errors.senha })}>
            <label htmlFor="inputSenha">Nova Senha</label>
            <input className="form-control" id="inputSenha"
              onChange={this.onChange} type="password" value={this.state.senha} name="senha">
            </input>
            {this.state.errors.Senha && <span className="help-block">{this.state.errors.Senha}</span>}
          </div>


          <div className={classnames('form-group', { 'fieldAnimate has-error': this.state.errors.Confirma })}>
            <label htmlFor="inputConfirma">Confirma nova senha</label>
            <input className="form-control" id="inputConfirma"
              onChange={this.onChange} type="password" value={this.state.confirma} name="confirma">
            </input>
            {this.state.errors.Confirma && <span className="help-block">{this.state.errors.Confirma}</span>}
          </div>

          <div className="login-btn-enviar">
            <img src={LogoDatamace} alt="Logotipo Datamace"/>
            <button disabled={this.state.isLoading} className="btn btn-primary" type="submit">Gravar</button>
          </div>

        </form>

      </div>

    </div>;
  }
}