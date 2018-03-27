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
import Cliente from './componentes/Cliente'

class App extends Component {


  componentDidMount() {
    if (!this.props.isAuthenticated)
      history.push('/Login');
  }

  renderApp() {
    if (this.props.isAuthenticated) {
      return <Layout AppName={this.props.appName}>
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute path='/Clientes' component={Clientes} />
        <PrivateRoute path='/Cliente/:Id' component={Cliente} />
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