import * as React from 'react';
import { connect } from 'react-redux';
import { clienteActions } from '../actions/cliente.actions';

class Clientes extends React.Component {

  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
  }



  fetch(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(clienteActions.getClientes(this.props.pageIndex, this.props.pageSize));
  }


  componentWillMount() {
    const { dispatch } = this.props;
    if (!this.props.clientes) {
      dispatch(clienteActions.getClientes(this.props.pageIndex, this.props.pageSize));
    }

  }


  renderClientes() {

    var clientes = [];
    if (this.props.clientes)
      clientes = this.props.clientes.map(function (cli) {
        return <li key={cli.codigo}>Nome: {cli.nome} - email: {cli.email}</li>
      });

    return clientes
  }

  render() {
    return <div className="row">
      <div className="col-md-12">
        <h2>Clientes</h2>
        <div>
          <ul>
            {this.renderClientes()}
          </ul>
        </div>
      </div>
      <div className="col-md-12">
        <button onClick={this.fetch} className="btn btn-primary">fetch</button>
      </div>
    </div>;
  }
}

function mapStateToProps(state) {
  const { clientes, pageIndex, pageSize, totalPages } = state.cliente;
  return {
    clientes, pageIndex, pageSize, totalPages
  };
}

export default connect(mapStateToProps)(Clientes);
