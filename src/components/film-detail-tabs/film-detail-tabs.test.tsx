import * as React from 'react';
import * as renderer from 'react-test-renderer';

import FilmDetailTabs from './film-detail-tabs';

describe(`FilmDetailTabsComponent`, () => {
  it(`FilmDetailTabsComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <FilmDetailTabs
            onTabClick={() => null}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
