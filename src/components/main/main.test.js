import React from 'react';
import renderer from 'react-test-renderer';

import {film, films} from '../../mocks-test/films-test.js';
import {user} from '../../mocks-test/user-test.js';

import Main from './main.jsx';

describe(`MainComponent`, () => {
  it(`MainComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <Main
            films={films}
            user={user}
            currentFilms={films}
            showFilmCardCount={8}
            filmCardPreview={film}
            handleFilmClick={() => {}}
            handleGenreTabClick={() => {}}
            handleShowMoreClick={() => {}}
            handlePlayClick={() => {}}
          />, {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
