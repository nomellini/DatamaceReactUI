import React, { Component } from "react";

class Checkbox extends Component {
  render() {
    const { id, descricao } = this.props;

    return (
      <div>
        <input type="checkbox" value={id} />
        {descricao}
      </div>
    );
  }
}

export default Checkbox;
