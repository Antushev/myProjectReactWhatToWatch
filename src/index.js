import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';

import {AuthorizationStatus} from './utils/const.js';
import {createApi} from './api.js';
import {reducer, ActionCreator} from './reducer.js';
import {Operation} from './reducer.js';

import App from './components/app/app.jsx';

const onUnauthorizate = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createApi(onUnauthorizate);

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>
      ,
      document.querySelector(`#root`)
  );
};

store.dispatch(Operation.loadFilms());
init();
