import React from 'react';
import classnames from 'classnames';

export default class FormUsuario extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      message: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({[event.target.key] : event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className={classnames('form-group', { 'fieldAnimate has-error': this.state.errors.Usuario })}>
          <label htmlFor="usuario">Usuario</label>
          <input className="form-control"
            onChange={this.onChange} type="text" value={this.state.usuario} name="usuario">
          </input>
          {this.state.errors.Usuario && <span className="help-block">{this.state.errors.Usuario}</span>}
        </div>
      </form>
    );
  }

}