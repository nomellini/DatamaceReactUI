import React from 'react';
import { Link } from 'react-router-dom';
import DtmPageBase from './DtmPageBase'
import { clienteActions } from '../../actions/cliente.actions';
import CardCliente from '../CardCliente'


export default class Clientes extends DtmPageBase {

  constructor(props) {
    super(props);

    this.fetch = this.fetch.bind(this);
    this.clientesCards = this.clientesCards.bind(this);
    this.testarApi = this.testarApi.bind(this);
    this.carregar = this.carregar.bind(this);

    this.state = {
      checkConnection: false,
      errors: {},
      isLoading: false
    }
  }

  testarApi(event) {
    this.setState({ checkConnection: true });
    this.fetch();
  }

  carregar(event) {
    this.setState({ checkConnection: false });
    this.fetch();
  }

  fetch(event) {

    this.setState({
      clientes: [],
      message: '',
      errors: {},
      isLoading: true
    });


    clienteActions.getClientes()
      .then(
        (res) => {
          this.setState(
            {
              isLoading: false,
              clientes: res.data
            }
          )
        },
        (err) => {
          if (err.message === "Network Error") {
            this.setState({ message: err.message, isLoading: false })
            return;
          }
          this.setState({ message: `${err.response.status} - ${err.response.statusText}`, isLoading: false })
        }
      )
  }

  componentWillMount() {
    super.componentWillMount();
  }

  componentDidMount() {
    this.carregar();
  }

  render() {
    return <div>

      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center">Cadastro de clientes</h3>
        </div>
      </div>

      {this.state.message && <div className="alert alert-danger">{this.state.message}</div>}

      <div className="card-container">
        <div className="card">
          <button disabled={this.state.isLoading} onClick={this.testarApi} className="btn btn-primary">Testar Api</button>
        </div>
        <div className="card">
          <Link disabled={this.state.isLoading} className='btn btn-danger' to={'/Cliente/0'}>Novo Cliente</Link>
        </div>
      </div>


      <div className="card-container">
        {this.clientesCards(this)}
      </div>



    </div>
  }

  isActive(cliente) {
    return true;// cliente.codigo <= 9;
  }

  clientesCards(_this) {
    const _clientes = this.state.clientes;
    var clientes = [];
    if (_clientes)
      clientes = _clientes.filter(this.isActive).map(function (cli) {
        return <CardCliente cliente={cli} key={cli.codigo} checkConnection={_this.state.checkConnection} />
      });
    return clientes
  }
}