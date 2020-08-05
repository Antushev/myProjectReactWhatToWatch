import React from 'react';
import renderer from 'react-test-renderer';

import Loading from './loading.jsx';

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
