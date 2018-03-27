import { Link } from 'react-router-dom';
import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { getClientes } from '../actions/cliente.actions';
import { addFlashMessage } from '../actions/flashMessages.actions'

class Clientes extends React.Component {

  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
  }

  fetch(event) {
    event.preventDefault();
    this.props.getClientes(this.props.pageIndex, this.props.pageSize);
  }

  componentWillMount() {
      this.props.getClientes(this.props.pageIndex, this.props.pageSize);
  }


  render() {
    return <div>


      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center">Cadastro de clientes</h3>
        </div>
      </div>

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
              <button disabled={this.props.isFetching} onClick={this.fetch} className="btn btn-primary">Carregar</button>
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

        return <tr className="" key={cli.codigo}>
          <td>{cli.codigo}</td>
          <td>{cli.nome}</td>
          <td>{cli.descricao}</td>
          <td>{cli.codigoSad}</td>
          <td>{cli.url}</td>
          <td>{cli.status}</td>
          <td>
            <span aria-hidden="true" className="glyphicon glyphicon-edit"></span>
          </td>
        </tr>
      });

    return clientes
  }
}

function mapStateToProps(state) {
  const { errorMessage, isFetching } = state;
  const { clientes, pageIndex, pageSize, totalPages } = state.cliente;
  return {
    clientes, pageIndex, pageSize, totalPages, errorMessage, isFetching
  };
}


Clientes.propTypes = {
  getClientes: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}


export default connect(mapStateToProps, { getClientes, addFlashMessage })(Clientes);
