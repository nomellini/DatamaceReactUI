
import { combineReducers, createStore, applyMiddleware, compose  } from 'redux';
//import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { authenticationReducer } from '../reducers/authentication.reducer';
import { clienteReducer } from '../reducers/cliente.reducer';

//import flashMessages from '../reducers/flashMessages';



//const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
  auth: authenticationReducer,
  cliente: clienteReducer
  //,flashMessages
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(/*loggerMiddleware,*/ thunkMiddleware)
    ,window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;