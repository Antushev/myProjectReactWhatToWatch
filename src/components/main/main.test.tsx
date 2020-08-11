import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {NameSpace} from '../../reducer/name-space';
import {film, films} from '../../mocks-test/films-t';
import {user} from '../../mocks-test/user-t';

import {noop} from '../../utils/const';

const filmTest: Film = film;
const filmsTest: Film[] = films;
const userTest: UserMaximum[] = user;

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
                films={filmsTest}
                user={userTest}
                authorizationStatus={`NO_AUTH`}
                currentFilms={filmsTest}
                showFilmCardCount={8}
                filmCardPreview={filmTest}
                onFilmClick={noop}
                onGenreTabClick={noop}
                onShowMoreClick={noop}
                onPlayClick={noop}
                onTypeScreenChange={noop}
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
                films={filmsTest}
                user={userTest}
                authorizationStatus={`AUTH`}
                currentFilms={filmsTest}
                showFilmCardCount={8}
                filmCardPreview={filmTest}
                onFilmClick={noop}
                onGenreTabClick={noop}
                onShowMoreClick={noop}
                onPlayClick={noop}
                onTypeScreenChange={noop}
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
