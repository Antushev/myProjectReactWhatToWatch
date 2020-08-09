import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history.js';

import {film, films} from '../../mocks-test/films-test.js';
import {user} from '../../mocks-test/user-test.js';

import Main from './main.jsx';

describe(`MainComponent`, () => {
  it(`MainComponentSnapshot authorizationStatus NO_AUTH`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
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
          </Router>, {
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
