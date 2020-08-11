import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Loading from './loading';

describe(`LoadingComponent`, () => {
  it(`LoadingComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <Loading />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
