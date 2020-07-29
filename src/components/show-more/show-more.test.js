import React from 'react';
import renderer from 'react-test-renderer';

import ShowMore from './show-more.jsx';

describe(`ShowMoreComponent`, () => {
  it(`ShowMoreComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <ShowMore
            handleShowMoreClick={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
