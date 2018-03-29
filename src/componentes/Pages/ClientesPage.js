import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DtmPageBase from './DtmPageBase'

import { getClientes } from '../../actions/cliente.actions';


class Clientes extends DtmPageBase {

  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
    this.state = {
      errors: {},
      isLoading: false
    }
  }

  fetch(event) {
    event.preventDefault();

    this.setState({ message: '', errors: {}, isLoading: true });

    getClientes()
      .then(
        (res) => {
          this.setState({ isLoading: false })
        },
        (err) => {
          console.log(err.message)

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
    getClientes();
  }

  render() {
    return <div>


      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center">Cadastro de clientes</h3>
        </div>
      </div>
      {this.state.message && <div className="alert alert-danger">{this.state.message}</div>}

      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>SAD</th>
                <th>URL</th>
                <th>Ativo</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {this.renderClientes()}
            </tbody>
          </table>
          <div className="row">
            <div className="col-md-2">
              <button disabled={this.state.isLoading} onClick={this.fetch} className="btn btn-primary">Carregar</button>
            </div>
            <div className="col-md-2">
              <Link className='btn btn-danger' to={'/Cliente/0'}>Novo Cliente</Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  }


  renderClientes() {

    var clientes = [];

    if (this.props.clientes)

      clientes = this.props.clientes.map(function (cli) {

        return <tr className={classnames({ 'danger fieldAnimate': !cli.status })} key={cli.codigo}>
          <td>{cli.codigo}</td>
          <td>{cli.nome}</td>
          <td>{cli.descricao}</td>
          <td>{cli.codigoSad}</td>
          <td>{cli.url}</td>
          <td>{cli.status ? "SIM" : "Não"}</td>
          <td>
            <Link to={`/cliente/${cli.codigo}`}><span aria-hidden="true" className="glyphicon glyphicon-edit"></span></Link>
          </td>
        </tr>
      });

    return clientes
  }
}

function mapStateToProps(state) {
  const { clientes  } = state.cliente;
  return {
    clientes
  };
}


export default connect(mapStateToProps)(Clientes);
