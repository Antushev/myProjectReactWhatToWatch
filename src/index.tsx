import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';

import {AuthorizationStatus} from './utils/const'
import {createApi} from './api';
import reducer from './reducer/reducer.js';
import {ActionCreator as DataActionCreator} from './reducer/data/data';
import {ActionCreator as UserActionCreator} from './reducer/user/user';
import {Operation as DataOperation} from './reducer/data/data';
import {Operation as UserOperation} from './reducer/user/user';

import App from './components/app/app';

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createApi(onUnauthorized);

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

store.dispatch(DataActionCreator.startLoad());
store.dispatch(DataOperation.loadFilms());
store.dispatch(UserOperation.checkAuthorizeUser());
init();
