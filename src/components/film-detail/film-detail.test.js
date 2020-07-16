import React from 'react';
import renderer from 'react-test-renderer';

import {film} from '../../mocks-test/films-test.js';

import FilmDetail from './film-detail.jsx';

describe(`FilmDetailComponent`, () => {
  it(`FilmDetailComponentSnapshot`, () => {
    const tree = renderer.create(
        <FilmDetail film={film} />
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
