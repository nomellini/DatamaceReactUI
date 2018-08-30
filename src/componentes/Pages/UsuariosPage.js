import React from "react";
import { userActions } from "../../actions/user.actions";
import DtmPageBase from "./DtmPageBase";
import CardUsuario from "../CardUsuario";
import FormUsuario from "../FormUsuario";

export default class UsuariosPage extends DtmPageBase {
  constructor(props) {
    super(props);
    this.carregar = this.carregar.bind(this);
    this.usuariosCards = this.usuariosCards.bind(this);
    this.onNewUser = this.onNewUser.bind(this);

    this.state = {
      users: []
    };
  }

  loadUsers(state) {}

  onNewUser(event) {
    event.preventDefault();
    this.setState({
      isAdding: !this.state.isAdding
    });
  }

  componentWillMount() {
    super.componentWillMount();
  }

  componentDidMount() {
    this.carregar();
  }

  carregar() {
    this.setState({
      users: [],
      message: "",
      errors: {},
      isLoading: true
    });

    userActions.obterUsuarios().then(res => {
      this.setState({
        isLoading: false,
        users: res.data
      });
    });
  }

  usuariosCards() {
    const { users } = this.state;

    let result = users.map(function(user) {
      return <CardUsuario user={user} key={user.codigo} />;
    });

    return result;
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center">Usuários</h3>
        </div>

        <div className="card-container">
          <div className="card-app">
            <button onClick={this.onNewUser} className="btn btn-danger">
              Cadastrar Novo Usuário
            </button>
            {this.state.isAdding ? (
              <FormUsuario
                updateUser={this.loadUsers}
                user={{ Master: false, status: true, CodigoPerfil: "1" }}
              />
            ) : null}
          </div>
        </div>

        <div className="card-container">{this.usuariosCards(this)}</div>
      </div>
    );
  }
}
