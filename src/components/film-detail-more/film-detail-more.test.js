import React from 'react';
import renderer from 'react-test-renderer';

import {film} from './../../mocks-test/films-test.js';

import FilmDetailMore from './film-detail-more.jsx';

describe(`FilmDetailMoreComponent`, () => {
  it(`FilmDetailMoreComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <FilmDetailMore
            film={film}
            renderTabs={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
