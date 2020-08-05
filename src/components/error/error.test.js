import React from 'react';
import renderer from 'react-test-renderer';

import Error from './error.jsx';

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
