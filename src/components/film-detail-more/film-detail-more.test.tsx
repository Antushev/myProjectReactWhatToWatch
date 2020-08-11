import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {film} from '../../mocks-test/films-t';

import FilmDetailMore from './film-detail-more';

describe(`FilmDetailMoreComponent`, () => {
  it(`FilmDetailMoreComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <FilmDetailMore
            film={film}
            renderTabs={() => null}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
