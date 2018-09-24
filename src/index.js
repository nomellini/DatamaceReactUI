import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";

import store from "./redux/store";
import setAuthorizationToken from "./utils/setAuthorizationToken";
import { setCurrentUser, userActions } from "./actions/user.actions";
import jwtDecode from "jwt-decode";
import { clienteActions } from "./actions/cliente.actions";

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

clienteActions.testarApiPorIdCliente(0).then(
  res => {},
  err => {
    userActions.logout();
  }
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
