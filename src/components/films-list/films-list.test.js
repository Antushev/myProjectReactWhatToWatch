import React from 'react';
import renderer from 'react-test-renderer';

import {films} from '../../utils/films-test.js';

import FilmsList from './films-list.jsx';

describe(`FilmsListComponent`, () => {
  it(`FilmcListComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <FilmsList
            films={films}
            handleHeaderClick={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
