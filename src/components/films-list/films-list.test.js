import React from 'react';
import renderer from 'react-test-renderer';

import {films} from '../../mocks-test/films-test.js';

import FilmsList from './films-list.jsx';

describe(`FilmsListComponent`, () => {
  it(`FilmcListComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <FilmsList
            films={films}
            handleFilmClick={() => {}}
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
