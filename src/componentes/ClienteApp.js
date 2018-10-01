import React, { Component } from "react";
import shortid from "shortid";
import classnames from "classnames";

import "../numbers.css";

export default class ClienteApp extends Component {
  constructor(props) {
    super(props);

    const dataApp = new Date(props.tipoApp.dataValidade);
    const data =
      dataApp.getFullYear() +
      "-" +
      ("0" + (dataApp.getMonth() + 1)).substr(-2) +
      "-" +
      ("0" + dataApp.getDate()).substr(-2);

    console.log(data);

    this.state = {
      ...props,
      tipoApp: props.tipoApp,
      quantidade: props.tipoApp.quantidade,
      dataValidade: data //
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

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
    const id2 = shortid.generate();
    const id3 = shortid.generate();

    return (
      <div>
        <div className={classnames("form-group")}>
          <input
            type="checkbox"
            name={descricao}
            id={id}
            onChange={this.onChange}
            onClick={this.onClick}
            checked={this.state.tipoApp.ativo}
          />
          <label htmlFor={id}>{descricao}</label>
          <label htmlFor={id2}>Quantidade</label>
          <input
            required
            min="1"
            type="number"
            size="3"
            maxLength="4"
            id={id2}
            name="quantidade"
            className="number"
            value={this.state.quantidade}
            onChange={this.onChange}
          />
          <label htmlFor={id3}>Validade</label>
          <input
            className="date"
            type="date"
            name="dataValidade"
            id={id3}
            value={this.state.dataValidade}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}
