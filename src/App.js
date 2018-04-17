import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './componentes/PrivateRoute'

import { history } from './helper/history';
import { userService } from './services/user.service'

import Layout from './componentes/Layout';
import AplicativosPage from './componentes/Pages/AplicativosPage';
import HomePage from './componentes/Pages/HomePage';
import LoginPage from './componentes/Pages/LoginPage';
import ClientesPage from './componentes/Pages/ClientesPage'
import ClientePage from './componentes/Pages/ClientePage'
import UsuariosPage from './componentes/Pages/UsuariosPage'
import LogoutComponent from './componentes/LogoutComponent'

import './site.css';

class App extends Component {


  componentDidMount() {
    if (!this.props.isAuthenticated)
      history.replace('/Login');
  }



  renderApp() {

    const linksList = [
      {
        Nome: "Clientes"
      },
      {
        Nome: "Aplicativos"
      }
    ]



    if (this.props.isAuthenticated) {
      return <Layout AppName={this.props.appName}>
        <Switch>
          <PrivateRoute exact path='/' component={HomePage} />
          <Route exact path='/Logout' component={LogoutComponent} />
          <PrivateRoute path='/Clientes' component={ClientesPage} />
          <PrivateRoute path='/Cliente/:Id' component={ClientePage} />
          <PrivateRoute path='/Aplicativos' component={AplicativosPage} />
          {userService.isMaster() ? <PrivateRoute path='/Usuarios' component={UsuariosPage} /> : null}
          <Route path="*" component={HomePage} />
        </Switch>
      </Layout>
    }
    else {
      return <Route exact path='/Login' component={LoginPage} />;
    }
  }

  render() {


    return (
      <Router history={history}>
        {this.renderApp()}
      </Router>
    );
  }
}

function mapStateToProps(state) {

  const appName = "Datamace";

  const { isAuthenticated } = state.auth;

  return {
    appName, isAuthenticated
  };
}

export default connect(mapStateToProps)(App);