import React from 'react';
import renderer from 'react-test-renderer';

import {film, films, currentGenre} from '../../mocks-test/films-test.js';

import {Main} from './main.jsx';

describe(`MainComponent`, () => {
  it(`MainComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <Main
            films={films}
            currentFilms={films}
            currentGenre={currentGenre}
            filmName={film.name}
            genre={film.genre}
            date={film.date}
            handleFilmClick={() => {}}
            handleGenreTabClick={() => {}}
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
