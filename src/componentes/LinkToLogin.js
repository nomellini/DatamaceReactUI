import React from 'react';
import { NavLink } from 'react-router-dom';
import { userActions } from '../actions/user.actions';
import { clienteActions } from '../actions/cliente.actions';
import { connect } from 'react-redux';

class LinkToLogin extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(userActions.logout());
    dispatch(clienteActions.logout());
  }

  render() {

    if (!this.props.usuario)
      return (
        <NavLink to={'/Login'} exact activeClassName='active'>
          <span className='glyphicon glyphicon-log-in'></span>Login
        </NavLink>)
    else
      return (
        <div>
          <a role="button" href="/Logout" onClick={this.onClick} clasname='btn'><span className='glyphicon glyphicon-log-out'></span>Logout</a>
        </div>
      )
  }
}

function mapStateToProps(state) {
  const { usuario } = state.auth;
  return {
    usuario
  };
}

export default connect(mapStateToProps)(LinkToLogin);