import React, { Component } from "react";
import shortid from "shortid";

export default class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      tipoApp: props.tipoApp
    };

    this.onClick = this.onClick.bind(this);
  }

  onChange(event) {}

  onClick(event) {
    const value = event.target.checked;

    this.setState({
      tipoApp: {
        ...this.state.tipoApp,
        ativo: value
      }
    });

    this.props.onCbClick({
      ...this.state.tipoApp,
      ativo: value
    });
  }

  render() {
    const { descricao } = this.state.tipoApp;
    const id = shortid.generate();
    return (
      <div>
        <input
          type="checkbox"
          name={descricao}
          id={id}
          onChange={this.onChange}
          onClick={this.onClick}
          checked={this.state.tipoApp.ativo}
        />
        <label htmlFor={id}>{descricao}</label>
      </div>
    );
  }
}
