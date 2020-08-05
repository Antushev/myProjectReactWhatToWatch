import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';

import {AuthorizationStatus} from './utils/const.js';
import {createApi} from './api.js';
import reducer from './reducer/reducer.js';
import {ActionCreator as DataActionCreator} from './reducer/data/data.js';
import {Operation as DataOperation} from './reducer/data/data.js';

import App from './components/app/app.jsx';

const onUnauthorizate = () => {
  store.dispatch(DataActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createApi(onUnauthorizate);

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataActionCreator.startLoad());
store.dispatch(DataOperation.loadFilms());

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>
      ,
      document.querySelector(`#root`)
  );
};

init();
