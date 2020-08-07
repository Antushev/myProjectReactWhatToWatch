import React from 'react';
import renderer from 'react-test-renderer';

import {film, films} from '../../mocks-test/films-test.js';
import {FilmsListType} from '../../mocks-test/films-test.js';

import FilmsList from './films-list.jsx';

describe(`FilmsListComponent`, () => {
  it(`FilmcListComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <FilmsList
            currentFilm={film}
            films={films}
            showFilmCardCount={8}
            filmListType={FilmsListType.DEFAULT}
            onFilmClick={() => {}}
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
