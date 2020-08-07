import React from 'react';
import renderer from 'react-test-renderer';

import {user} from './../../mocks-test/user-test.js';

import AddReview from './add-review.jsx';

describe(`AddReviewComponent`, () => {
  it(`AddReviewComponentSnapshot with NO_AUTH user`, () => {
    const tree = renderer
      .create(
          <AddReview
            user={user}
            authorizationStatus={`NO_AUTH`}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`AddReviewComponentSnapshot with AUTH user`, () => {
    const tree = renderer
      .create(
          <AddReview
            user={user}
            authorizationStatus={`AUTH`}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
