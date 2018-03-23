import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './componentes/PrivateRoute'

import './site.css';


import { history } from './helper/history';
import Home from './componentes/Home';
import Layout from './componentes/Layout';
import LoginPage from './componentes/LoginPage';
import Clientes from './componentes/Clientes'

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <Layout AppName={this.props.appName}>
          <Route exact path='/' component={Home} />
          <Route exact path='/Login' component={LoginPage} />
          <PrivateRoute path='/Clientes' component={Clientes}/>
        </Layout>
      </Router>
    );
  }
}

function mapStateToProps(state) {

  const { usuario } = state.auth;
  const appName = usuario ? "Datamace - " + usuario: "Datamace";

  return {
    appName
  };
}

export default connect(mapStateToProps)(App);