import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history.js';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {NameSpace} from './../../reducer/name-space.js';
import {film, films} from '../../mocks-test/films-test.js';
import {user} from '../../mocks-test/user-test.js';

import Main from './main';

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    films
  }
});

describe(`MainComponent`, () => {
  it(`MainComponentSnapshot authorizationStatus NO_AUTH`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <Main
                films={films}
                user={user}
                authorizationStatus={`NO_AUTH`}
                currentFilms={films}
                showFilmCardCount={8}
                filmCardPreview={film}
                onFilmClick={() => {}}
                onGenreTabClick={() => {}}
                onShowMoreClick={() => {}}
                onPlayClick={() => {}}
                onTypeScreenChange={() => {}}
              />
            </Provider>
          </Router>
          , {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`MainComponentSnapshot authorizationStatus AUTH`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <Main
                films={films}
                user={user}
                authorizationStatus={`AUTH`}
                currentFilms={films}
                showFilmCardCount={8}
                filmCardPreview={film}
                onFilmClick={() => {}}
                onGenreTabClick={() => {}}
                onShowMoreClick={() => {}}
                onPlayClick={() => {}}
                onTypeScreenChange={() => {}}
              />
            </Provider>
          </Router>, {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
