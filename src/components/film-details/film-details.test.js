import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import reducer from './../../reducer/reducer.js';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history.js';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {NameSpace} from './../../reducer/name-space.js';

import {createApi} from './../../api.js';

import {film, films} from '../../mocks-test/films-test.js';
import {user} from '../../mocks-test/user-test.js';
import {comments} from '../../mocks-test/comment-test.js';

import FilmDetails from './film-details';

const activeTab = `overview`;

const api = createApi();

const store = createStore(
    reducer,
    {
      [NameSpace.DATA]: {
        film: null,
        films,
        id: 1
      }
    },
    applyMiddleware(thunk.withExtraArgument(api))
);

describe(`FilmDetailsComponent`, () => {
  it(`FilmDetailsComponentSnapshot`, () => {

    const match = {
      params: {
        id: 1
      }
    };

    const tree = renderer
      .create(
          <Provider store={store}>
            <Router history={history}>
              <FilmDetails
                filmDetail={film}
                films={films}
                user={user}
                comments={comments}
                match={match}
                authorizationStatus={`NO_AUTH`}
                activeTab={activeTab}
                loadComments={() => {}}
                renderTabs={() => {}}
                onFilmClick={() => {}}
                onPlayClick={() => {}}
                onTypeScreenChange={() => {}}
              />
            </Router>
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
