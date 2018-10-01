import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import DtmPageBase from "./DtmPageBase";

class Home extends DtmPageBase {
  BoasVindas() {
    const { unique_name } = this.props;
    return unique_name
      ? `Você está logado como ${unique_name}`
      : "Faça login para começar";
  }

  render() {
    return (
      <div>
        <div className="col-md-12">
          <h1>Datamace Mobile Portal</h1>
          <p>{this.BoasVindas()}</p>
          <p>Opções</p>
          <ul>
            <li>
              <Link to={"/Clientes"}>Listar Clientes</Link>
            </li>
            <li>
              <Link to={"/Cliente/0"}>Adicionar Clientes</Link>
            </li>
            <li>
              <Link to={"/Aplicativos"}>Aplicativos</Link>
            </li>
            <li>
              <Link to={"/Usuarios"}>Usuários</Link>
            </li>
            <li>
              <Link to={"/Logout"}>Sair</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { unique_name } = state.auth.user;
  return {
    unique_name
  };
}

export default connect(mapStateToProps)(Home);
