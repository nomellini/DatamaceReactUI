import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userService } from '../services/user.service.js';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      userService.isLogged()
      ? (<Component {...props} />)
      : (<Redirect to={{pathname: "/Login", state: { from: props.location }}}/>
      )}
  />
);

export default PrivateRoute;