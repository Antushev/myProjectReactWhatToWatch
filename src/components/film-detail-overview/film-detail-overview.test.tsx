import React from 'react';
import renderer from 'react-test-renderer';

import {film} from '../../mocks-test/films-test.js';

import FilmDetailOverview from './film-detail-overview';

describe(`FilmDetailComponent`, () => {
  it(`FilmDetailComponentSnapshot`, () => {
    const tree = renderer.create(
        <FilmDetailOverview
          film={film}
          renderTabs={() => {}}
        />
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
