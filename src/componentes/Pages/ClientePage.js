import React from "react";
import classnames from "classnames";
import DtmPageBase from "./DtmPageBase";
import { clienteActions } from "../../actions/cliente.actions";
import { clienteService } from "../../services/cliente.service";
import Checkbox from "../Checkbox";
import ClienteApp from "../ClienteApp";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Cliente extends DtmPageBase {
  constructor(props) {
    super(props);
    let hoje = new Date();
    let DaquiUmAno = hoje;
    DaquiUmAno.setDate(hoje.getDate() + 365);

    this.state = {
      errors: {},
      aplicacoes: [],
      isLoading: false,
      recriar: false
    };

    clienteService.getDefault().then(res => {
      this.setState({
        ...this.state,
        ...res.data,
        status: true,
        dataValidade: DaquiUmAno
      });
    });

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.gravar = this.gravar.bind(this);
    this.onCbClick = this.onCbClick.bind(this);
  }

  onCbClick(i) {
    let cliente = this.state;
    let cli = cliente.aplicacoes.find(app => app.codigo === i.codigo); //
    cli.ativo = i.ativo;
    if (cli.quantidade === null || cli.quantidade < 0) {
      cli.quantidade = 1;
    }
    this.setState({
      ...cliente
    });
  }

  Aplicativos() {
    const { aplicacoes } = this.state;
    console.log(aplicacoes);
    const result = aplicacoes.map(tipoApp => {
      return (
        <ClienteApp
          key={tipoApp.codigo}
          tipoApp={tipoApp}
          onCbClick={this.onCbClick}
        />
      );
    });
    return result;
  }

  componentWillMount() {
    var ClienteId = this.props.match.params.Id;
    if (ClienteId > 0)
      clienteActions.getClienteById(ClienteId).then(
        res => {
          this.setState({
            ...res.data,
            recriar: true
          });
        },
        err => {}
      );
  }

  aplicarLicenca = () => {
    var ClienteId = this.props.match.params.Id;

    if (ClienteId > 0) {
      clienteActions.aplicarLicencaPorIdCliente(ClienteId).then(
        res => {
          toast.success("Licença aplicada com sucesso !");
        },
        err => {
          toast.error(`Erro ao aplicar a licença: ${err.response.statusText}`);
        }
      );
    }
  };

  testarApi = () => {
    var ClienteId = this.props.match.params.Id;
    if (ClienteId > 0) {
      clienteActions.testarApiPorIdCliente(ClienteId).then(
        res => {
          toast.success("API testada com sucesso !");
        },
        err => {
          toast.error("Erro ao conectar a API");
        }
      );
    }
  };

  gravar() {
    this.setState({ message: "", errors: {}, isLoading: true });

    clienteActions.addCliente(this.state).then(
      res => {
        // addFlashMessage adiciona uma mensagem na lista de mensagems do aplicativo
        //Mensagens.addFlashMessageSucesso('Não sei');
        //history.replace('/clientes');
        toast.success("Cliente atualizado no banco de dados");
      },
      err => {
        if (err.message === "Network Error") {
          // message no state é apenas desta tela
          this.setState({ message: err.message, isLoading: false });
          return;
        }
        if (err.response.status !== 200) {
          if (err.response.status === 400) {
            this.setState({ errors: err.response.data.errors });
            this.setState({
              message: err.response.data.message,
              isLoading: false
            });
          } else {
            this.setState({
              message: `${err.response.status} - ${err.response.statusText}`,
              isLoading: false
            });
          }
        }
      }
    );
  }

  onChange(event) {
    event.preventDefault();
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleChange(event) {
    const { target } = event;

    if (target.checked) {
      target.removeAttribute("checked");
    } else {
      target.setAttribute("checked", true);
    }

    this.setState({ status: event.target.checked });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center">Editar / Incluir Cliente</h3>
          </div>
        </div>

        {this.state.message && (
          <div className="alert alert-danger">{this.state.message}</div>
        )}
        <div className="row">
          <div className="col-sm-8">
            <div className="form-horizontal">
              <div
                className={classnames("form-group", {
                  "has-error fieldAnimate": this.state.errors.Nome
                })}
              >
                <label htmlFor="inputNome" className="col-md-4 control-label">
                  Nome
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputNome"
                    name="nome"
                    className="form-control"
                    value={this.state.nome}
                    onChange={this.onChange}
                  />
                  {this.state.errors.Nome && (
                    <span className="help-block">{this.state.errors.Nome}</span>
                  )}
                </div>
              </div>
              <div
                className={classnames("form-group", {
                  "has-error fieldAnimate": this.state.errors.descricao
                })}
              >
                <label
                  htmlFor="inputDescricao"
                  className="col-md-4 control-label"
                >
                  Descricao
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputDescricao"
                    name="descricao"
                    className="form-control"
                    value={this.state.descricao}
                    onChange={this.onChange}
                  />
                  {this.state.errors.descricao && (
                    <span className="help-block">
                      {this.state.errors.descricao}
                    </span>
                  )}
                </div>
              </div>
              <div
                className={classnames("form-group", {
                  "has-error fieldAnimate": this.state.errors.CNPJ
                })}
              >
                <label htmlFor="inputCnpj" className="col-md-4 control-label">
                  CNPJ
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputCnpj"
                    name="cnpj"
                    className="form-control"
                    value={this.state.cnpj}
                    onChange={this.onChange}
                  />
                  {this.state.errors.CNPJ && (
                    <span className="help-block">{this.state.errors.CNPJ}</span>
                  )}
                </div>
              </div>
              <div
                className={classnames("form-group", {
                  "has-error fieldAnimate": this.state.errors.codigoSad
                })}
              >
                <label htmlFor="codigoSad" className="col-md-4 control-label">
                  Código SAD
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="codigoSad"
                    name="codigoSad"
                    className="form-control"
                    value={this.state.codigoSad}
                    onChange={this.onChange}
                  />
                  {this.state.errors.codigoSad && (
                    <span className="help-block">
                      {this.state.errors.codigoSad}
                    </span>
                  )}
                </div>
              </div>
              <div
                className={classnames("form-group", {
                  "has-error fieldAnimate": this.state.errors.URL
                })}
              >
                <label htmlFor="inputURL" className="col-md-4 control-label">
                  URL Server API
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputURL"
                    name="url"
                    className="form-control"
                    value={this.state.url}
                    onChange={this.onChange}
                  />
                  {this.state.errors.URL && (
                    <span className="help-block">{this.state.errors.URL}</span>
                  )}
                </div>
              </div>
              <div
                className={classnames("form-group", {
                  "has-error fieldAnimate": this.state.errors.Email
                })}
              >
                <label htmlFor="inputEmail" className="col-md-4 control-label">
                  Email
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputEmail"
                    name="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {this.state.errors.Email && (
                    <span className="help-block">
                      {this.state.errors.Email}
                    </span>
                  )}
                </div>
              </div>

              {this.state.recriar ? this.Aplicativos() : null}

              <hr />
              <div
                className={classnames(
                  { ApiClienteOk: this.state.status },
                  { ApiClienteFailure: !this.state.status }
                )}
              >
                <div
                  className={classnames("form-group", {
                    "has-error fieldAnimate": this.state.errors.status
                  })}
                >
                  <label
                    htmlFor="inputStatus"
                    className="col-md-4 control-label"
                  >
                    Cliente {this.state.status ? "Ativo" : "Inativo"}
                  </label>
                  <div className="col-md-8">
                    <input
                      id="inputStatus"
                      type="checkbox"
                      name="status"
                      onClick={this.handleChange}
                      checked={this.state.status}
                      defaultChecked={this.state.status}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button onClick={this.gravar} className="btn btn-primary">
              Gravar
            </button>
            &nbsp;
            <button onClick={this.testarApi} className="btn btn-primary">
              Testar Api
            </button>
            &nbsp;
            <button onClick={this.aplicarLicenca} className="btn btn-primary">
              Aplicar licença
            </button>
          </div>
        </div>
        <ToastContainer autoClose={2500} hideProgressBar={true} />
      </div>
    );
  }
}
