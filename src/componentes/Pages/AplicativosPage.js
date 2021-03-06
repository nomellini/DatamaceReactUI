import React from "react";
import { APP_API } from "../../helper/apiConfig";
import shortid from "shortid";
import DtmPageBase from "./DtmPageBase";
import CardAplicativo from "../CardAplicativo";
import axios from "axios";
import FormAplicativo from "../FormAplicativo";
import listaTipoApp from "../../helper/listaTipoApp";
import { appService } from "../../services/app.service";

export default class AplicativosPage extends DtmPageBase {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      listaTipoApp: listaTipoApp(),
      isLoading: false,
      isAdding: false
    };

    appService.getAutorizacoes().then(res => {
      this.setState({
        ...this.state,
        autorizacoes: res.data
        /*
        autorizacoes: [
          {
            codigo: 1,
            descricao: "Ponto"
          },
          {
            codigo: 2,
            descricao: "Workflow - MOP"
          },
          {
            codigo: 3,
            descricao: "Algum outro!1"
          }
        ]
        */
      });
    });

    this.loadApps = this.loadApps.bind(this);
    this.onNewApp = this.onNewApp.bind(this);
  }

  onNewApp(event) {
    event.preventDefault();
    this.setState({
      isAdding: !this.state.isAdding
    });
  }

  loadApps() {
    this.setState({
      apps: [],
      message: "",
      errors: {},
      isLoading: false,
      isAdding: false
    });

    return axios.get(APP_API).then(res => {
      this.setState({
        ...this.state,
        apps: res.data,
        isLoading: false
      });
    });
  }

  componentDidMount() {
    this.loadApps();
  }

  renderCards(_this) {
    const _apps = _this.state.apps;

    var apps = [];
    if (_apps) {
      apps = _apps.map(function(app) {
        return (
          <CardAplicativo
            autorizacoes={_this.state.autorizacoes}
            app={app}
            key={shortid.generate()}
          />
        );
      });
    }
    return apps;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center">Cadastro de Aplicativos</h3>
          </div>
        </div>

        {this.state.message && (
          <div className="alert alert-danger">{this.state.message}</div>
        )}

        <div className="card-container">
          <div className="card-app">
            <button onClick={this.onNewApp} className="btn btn-danger">
              Cadastrar Novo Aplicativo
            </button>
            {this.state.isAdding ? (
              <FormAplicativo
                updateApp={this.loadApps}
                app={{ status: true, listaTipoApp: listaTipoApp() }}
              />
            ) : null}
          </div>
        </div>

        <div className="card-container">{this.renderCards(this)}</div>
      </div>
    );
  }
}
