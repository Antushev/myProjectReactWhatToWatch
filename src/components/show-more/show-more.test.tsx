import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {noop} from '../../utils/const';

import ShowMore from './show-more';

describe(`ShowMoreComponent`, () => {
  it(`ShowMoreComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <ShowMore
            onShowMoreClick={noop}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
