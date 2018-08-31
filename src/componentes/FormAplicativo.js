import React from "react";
import classnames from "classnames";
import { appService } from "../services/app.service";
import Checkbox from "./Checkbox";

export default class FormAplicativo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //app:
      ...this.props.app,
      errors: [],
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.Autorizacoes = this.Autorizacoes.bind(this);

    this.onCbClick = this.onCbClick.bind(this);
  }

  /**
   * Esta função deve ser passada por props para o CheckBox
   */
  onCbClick(i) {
    let app = this.state;

    app.listaTipoApp.find(app => app.codigo === i.codigo).ativo = i.ativo;

    console.log(this.state);

    this.setState({
      ...app
    });
  }

  Autorizacoes() {
    const { listaTipoApp } = this.state;
    const result = listaTipoApp.map(tipoApp => {
      return (
        <Checkbox
          key={tipoApp.codigo}
          tipoApp={tipoApp}
          onCbClick={this.onCbClick}
        />
      );
    });
    return result;
  }

  handleChange(event) {
    const { target } = event;
    let { name } = target;
    if (target.checked) {
      target.removeAttribute("checked");
    } else {
      target.setAttribute("checked", true);
    }
    this.setState({ [name]: event.target.checked });
  }

  onSubmit(event) {
    event.preventDefault();

    this.setState({
      message: "",
      errors: []
    });

    appService.gravaApp(this.state).then(
      () => {
        this.props.updateApp(this.state);
      },
      err => {
        this.setState({ temErros: true });

        if (err.message === "Network Error") {
          // message no state é apenas desta tela
          this.setState({
            message: "Servidor não encontrado",
            isLoading: false
          });
          return;
        }
        this.setState({
          errors: err.response.data.errors,
          message: err.response.data.message,
          isLoading: false
        });
      }
    );
  }

  onChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="form-aplicativo shaddow">
        <div
          className={classnames("form-group", {
            "fieldAnimate has-error": this.state.errors.Nome
          })}
        >
          <label htmlFor="nome">Nome</label>
          <input
            className="form-control"
            id="nome"
            name="nome"
            onChange={this.onChange}
            type="text"
            value={this.state.nome}
          />
          {this.state.errors.Nome && (
            <span className="help-block">{this.state.errors.Nome}</span>
          )}
        </div>

        <div
          className={classnames("form-group", {
            "fieldAnimate has-error": this.state.errors.descricao
          })}
        >
          <label htmlFor="descricao">Descrição</label>
          <input
            className="form-control"
            id="descricao"
            name="descricao"
            onChange={this.onChange}
            type="text"
            value={this.state.descricao}
          />
          {this.state.errors.descricao && (
            <span className="help-block">{this.state.errors.descricao}</span>
          )}
        </div>

        <div
          className={classnames("form-group", {
            "fieldAnimate has-error": this.state.errors.Email
          })}
        >
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            id="email"
            name="email"
            onChange={this.onChange}
            type="text"
            value={this.state.email}
          />
          {this.state.errors.Email && (
            <span className="help-block">{this.state.errors.Email}</span>
          )}
        </div>

        {this.Autorizacoes()}
        <hr />

        <div
          className={classnames(
            { ApiClienteOk: this.state.status },
            { ApiClienteFailure: !this.state.status }
          )}
        >
          <div
            className={classnames("form-group", {
              "has-error": this.state.errors.Status
            })}
          >
            <input
              type="checkbox"
              name="status"
              id="inputStatus"
              onChange={this.handleChange}
              onClick={this.handleChange}
              checked={this.state.status}
            />
            <label htmlFor="inputStatus">
              {" "}
              App {this.state.status ? " Ativo " : " Inativo "}
            </label>
          </div>
        </div>

        <div className="login-btn-enviar">
          <button
            disabled={this.state.isLoading}
            className="btn btn-primary"
            type="submit"
          >
            Gravar
          </button>
        </div>
      </form>
    );
  }
}
