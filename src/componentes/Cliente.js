import React from 'react'
import { connect } from 'react-redux'
import { addCliente } from '../actions/cliente.actions'
import PropTypes from 'prop-types'

class Cliente extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.gravar = this.gravar.bind(this);


    this.state = {
      codigo: 0,
      nome: "",
      descricao: '',
      codigoSad: '',
      url: '',
      email: '',
      status: false
    }
  }

  gravar()
  {
    console.log(JSON.stringify( this.state));
    this.props.addCliente(this.state);
  }

  onChange(event) {
    event.preventDefault();
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleChange(event) {
    const { target } = event;

    if (target.checked) {
      target.removeAttribute('checked');
      target.parentNode.style.textDecoration = "";
    } else {
      target.setAttribute('checked', true);
      target.parentNode.style.textDecoration = "line-through";
    }

    this.setState({ status: event.target.checked });

  }

  render() {
    return <div>
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center">Editar / Incluir Cliente</h3>
        </div>
      </div>



      <div className="row">
        <div className="col-sm-8">
          <div className="form-horizontal">

            <div className="form-group">
              <label htmlFor="inputNome" className="col-md-4 control-label">Nome</label>
              <div className="col-md-8">
                <input type="text"
                  name="nome" className="form-control" value={this.state.nome} onChange={this.onChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input" className="col-md-4 control-label">Descricao</label>
              <div className="col-md-8">
                <input type="text" name="descricao" className="form-control" value={this.state.descricao} onChange={this.onChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input" className="col-md-4 control-label">Código SAD</label>
              <div className="col-md-8">
                <input type="text" name="codigoSad" className="form-control" value={this.state.codigoSad} onChange={this.onChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input" className="col-md-4 control-label">URL Server API</label>
              <div className="col-md-8">
                <input type="text" name="url" className="form-control" value={this.state.url} onChange={this.onChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input" className="col-md-4 control-label">Email</label>
              <div className="col-md-8">
                <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.onChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input" className="col-md-4 control-label">Cliente Ativo</label>
              <div className="col-md-8">

                <input
                  type="checkbox"
                  name="status"
                  onClick={this.handleChange}
                  defaultChecked={this.state.status} />
              </div>
            </div >

          </div >
        </div >
      </div >
      <div className="row">
        <div className="col-md-6">
          <button onClick={this.gravar} className='btn btn-primary' to={'/Cliente/0'}>Gravar</button>
        </div>
        <div className="col-md-6">
        </div>
      </div>

    </div >
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ClienteId: ownProps.match.params.Id
  };
}

Cliente.propTypes = {
  addCliente: PropTypes.func.isRequired
}


export default connect(mapStateToProps, {addCliente})(Cliente);