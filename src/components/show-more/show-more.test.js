import React from 'react';
import renderer from 'react-test-renderer';

import ShowMore from './show-more.jsx';

describe(`ShowMoreComponent`, () => {
  it(`ShowMoreComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <ShowMore
            onShowMoreClick={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
