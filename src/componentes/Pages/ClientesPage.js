import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DtmPageBase from './DtmPageBase'

import { clienteActions } from '../../actions/cliente.actions';
import CardCliente from '../CardCliente'


class Clientes extends DtmPageBase {

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
          this.setState({ isLoading: false })
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
    console.log('componentDidMount', this.props)
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
        {this.clientesCards(this)}
      </div>

      <div className="card-container">
        <div className="card">
          <button disabled={this.state.isLoading} onClick={this.carregar} className="btn btn-primary">Carregar</button>
        </div>
        <div className="card">
          <button disabled={this.state.isLoading} onClick={this.testarApi} className="btn btn-primary">Testar Api</button>
        </div>
        <div className="card">
          <Link className='btn btn-danger' to={'/Cliente/0'}>Novo Cliente</Link>
        </div>
      </div>


    </div>
  }

  isActive(cliente) {
    return true;// cliente.codigo <= 9;
  }

  clientesCards(_this) {

    const _clientes = this.props.clientes;

    var clientes = [];
    if (_clientes)
      clientes = _clientes.filter(this.isActive).map(function (cli) {
        return <CardCliente cliente={cli} key={cli.codigo} checkConnection={_this.state.checkConnection} />
      });
    return clientes
  }


  // renderClientes() {

  //   var clientes = [];

  //   if (this.props.clientes)

  //     clientes = this.props.clientes.map(function (cli) {

  //       return <tr className={classnames({ 'danger fieldAnimate': !cli.status })} key={cli.codigo}>
  //         <td>{cli.codigo}</td>
  //         <td>{cli.nome}</td>
  //         <td>{cli.descricao}</td>
  //         <td>{cli.codigoSad}</td>
  //         <td>{cli.url}</td>
  //         <td>{cli.status ? "SIM" : "Não"}</td>
  //         <td>
  //           <Link to={`/cliente/${cli.codigo}`}><span aria-hidden="true" className="glyphicon glyphicon-edit"></span></Link>
  //         </td>
  //         <td>
  //           <Link to={`/cliente/${cli.codigo}`}><span aria-hidden="true" className="glyphicon glyphicon-eye-open"></span></Link>
  //         </td>
  //         <td>
  //           <TestApiComponent />
  //         </td>
  //       </tr>
  //     });

  //  return clientes
  //}
}

function mapStateToProps(state) {
  console.log('MapStateToProps', state)
  const { clientes } = state.cliente;
  return { clientes };
}

export default connect(mapStateToProps)(Clientes);