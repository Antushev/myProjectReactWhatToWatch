import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Error from './error';

describe(`ErrorComponent`, () => {
  it(`ErrorComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <Error />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
