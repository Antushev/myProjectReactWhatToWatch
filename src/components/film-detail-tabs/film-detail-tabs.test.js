import React from 'react';
import renderer from 'react-test-renderer';

import FilmDetailTabs from './film-detail-tabs.jsx';

describe(`FilmDetailTabsComponent`, () => {
  it(`FilmDetailTabsComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <FilmDetailTabs
            handleTabClick={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
