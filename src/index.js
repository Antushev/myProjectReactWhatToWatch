import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import history from './history.js';

import {AppRoute, AuthorizationStatus} from './utils/const.js';
import {createApi} from './api.js';
import reducer from './reducer/reducer.js';
import {ActionCreator as DataActionCreator} from './reducer/data/data.js';
import {ActionCreator as UserActionCreator} from './reducer/user/user.js';
import {Operation as DataOperation} from './reducer/data/data.js';
import {Operation as UserOperation} from './reducer/user/user.js';

import App from './components/app/app.jsx';

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
  history.push(AppRoute.LOGIN);
};

const api = createApi(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataActionCreator.startLoad());
store.dispatch(DataOperation.loadFilms());
store.dispatch(UserOperation.checkAuthorizeUser());

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
