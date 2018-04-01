import React from 'react';
import { NavLink } from 'react-router-dom';
import { userActions } from '../actions/user.actions';
import { connect } from 'react-redux';

class LinkToLogin extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    userActions.logout();
  }

  render() {

    if (!this.props.isAuthenticated)
      return (
        <NavLink to={'/Login'} exact activeClassName='active'>
          <span className='glyphicon glyphicon-log-in'></span>Login
        </NavLink>)
    else
      return (
        <NavLink to={'/Logout'} exact activeClassName='active'>
          <span className='glyphicon glyphicon-log-out'></span>Sair
        </NavLink>)

        // <div>
        //   <a role="button" href="/Logout" onClick={this.onClick} clasname='btn'><span className='glyphicon glyphicon-log-out'></span>Logout</a>
        // </div>
      //)
  }
}

function mapStateToProps(state) {
  const { isAuthenticated } = state.auth;
  return {
    isAuthenticated
  };
}

export default connect(mapStateToProps)(LinkToLogin);