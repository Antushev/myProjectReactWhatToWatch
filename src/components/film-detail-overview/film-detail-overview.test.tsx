import * as React from 'react';
import * as renderer from 'react-test-renderer'

import {film} from '../../mocks-test/films-t';

import FilmDetailOverview from './film-detail-overview';

describe(`FilmDetailComponent`, () => {
  it(`FilmDetailComponentSnapshot`, () => {
    const renderTabs = jest.fn();

    const tree = renderer.create(
        <FilmDetailOverview
          film={film}
          renderTabs={renderTabs}
        />
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
