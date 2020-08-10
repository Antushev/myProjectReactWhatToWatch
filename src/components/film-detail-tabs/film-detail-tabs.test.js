import React from 'react';
import renderer from 'react-test-renderer';

import FilmDetailTabs from './film-detail-tabs';

describe(`FilmDetailTabsComponent`, () => {
  it(`FilmDetailTabsComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <FilmDetailTabs
            onTabClick={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
