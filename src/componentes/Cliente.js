import classnames from 'classnames';
import React from 'react'
import { connect } from 'react-redux'
import { addCliente } from '../actions/cliente.actions'
import { addFlashMessage } from '../actions/flashMessages.actions'
import PropTypes from 'prop-types'
import { history } from '../helper/history';

class Cliente extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      errors: {},
      isLoading: false,

      codigo: 0,
      nome: "",
      descricao: '',
      codigoSad: '',
      url: '',
      email: '',
      Cnpj: '',
      dataValidade: '2022-01-01T16:30:39.263Z',
      status: false
    }

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.gravar = this.gravar.bind(this);

  }

  gravar() {
    this.setState({ message: '', errors: {}, isLoading: true });

    this.props.addCliente(this.state).then(

      (res) => {
        // addFlashMessage adiciona uma mensagem na lista de mensagems do aplicativo
        this.props.addFlashMessage({
          type: 'success',
          text: `Cliente inserido com sucesse !`
        });
        history.push('/clientes');
      },

      (err) => {

        if (err.message === "Network Error") {
          // message no state é apenas desta tela
          this.setState({ message: err.message, isLoading: false })
          return;
        }


        if (err.response.status !== 200) {

          if (err.response.status === 400) {
            this.setState({ errors: err.response.data.errors })
            this.setState({ message: err.response.data.message, isLoading: false })
          }
          else {
            this.setState(
              {
                message: `${err.response.status} - ${err.response.statusText}`, isLoading: false
              }
            )
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

      {this.state.message && <div className="alert alert-danger">{this.state.message}</div>}

      <div className="row">
        <div className="col-sm-8">
          <div className="form-horizontal">

            <div className={classnames('form-group', { 'has-error': this.state.errors.nome })}>
              <label htmlFor="inputNome" className="col-md-4 control-label">Nome</label>
              <div className="col-md-8">
                <input type="text"
                  name="nome" className="form-control" value={this.state.nome} onChange={this.onChange} />
                {this.state.errors.nome && <span className="help-block">{this.state.errors.nome}</span>}
              </div>
            </div>

            <div className={classnames('form-group', { 'has-error': this.state.errors.descricao })}>
              <label htmlFor="input" className="col-md-4 control-label">Descricao</label>
              <div className="col-md-8">
                <input type="text" name="descricao" className="form-control" value={this.state.descricao} onChange={this.onChange} />
                {this.state.errors.descricao && <span className="help-block">{this.state.errors.descricao}</span>}
              </div>
            </div>


            <div className={classnames('form-group', { 'has-error': this.state.errors.cnpj })}>
              <label htmlFor="input" className="col-md-4 control-label">CNPJ</label>
              <div className="col-md-8">
                <input type="text" name="cnpj" className="form-control" value={this.state.cnpj} onChange={this.onChange} />
                {this.state.errors.cnpj && <span className="help-block">{this.state.errors.cnpj}</span>}
              </div>
            </div>

            <div className={classnames('form-group', { 'has-error': this.state.errors.codigoSad })}>
              <label htmlFor="input" className="col-md-4 control-label">Código SAD</label>
              <div className="col-md-8">
                <input type="text" name="codigoSad" className="form-control" value={this.state.codigoSad} onChange={this.onChange} />
                {this.state.errors.codigoSad && <span className="help-block">{this.state.errors.codigoSad}</span>}
              </div>
            </div>

            <div className={classnames('form-group', { 'has-error': this.state.errors.url })}>
              <label htmlFor="input" className="col-md-4 control-label">URL Server API</label>
              <div className="col-md-8">
                <input type="text" name="url" className="form-control" value={this.state.url} onChange={this.onChange} />
                {this.state.errors.url && <span className="help-block">{this.state.errors.url}</span>}
              </div>
            </div>

            <div className={classnames('form-group', { 'has-error': this.state.errors.email })}>
              <label htmlFor="input" className="col-md-4 control-label">Email</label>
              <div className="col-md-8">
                <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.onChange} />
                {this.state.errors.email && <span className="help-block">{this.state.errors.email}</span>}
              </div>
            </div>

            <div className={classnames('form-group', { 'has-error': this.state.errors.status })}>
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
  addFlashMessage: PropTypes.func.isRequired,
  addCliente: PropTypes.func.isRequired
}


export default connect(
  mapStateToProps,
  {
    addCliente,
    addFlashMessage
  }
)(Cliente);