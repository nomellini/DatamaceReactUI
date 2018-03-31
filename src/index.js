import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

import store from './redux/store';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/user.actions';
import jwtDecode from 'jwt-decode';

// if (localStorage.jwtToken) {
//   setAuthorizationToken(localStorage.jwtToken);
//   store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
// }

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
