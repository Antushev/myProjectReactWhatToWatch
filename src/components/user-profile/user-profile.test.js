import React from 'react';
import renderer from 'react-test-renderer';

import {user} from './../../mocks-test/user-test.js';

import UserProfile from './user-profile.jsx';

describe(`UserProfileComponent`, () => {
  it(`UserProfileComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <UserProfile
            user={user}
            authorizationStatus={`AUTH`}
            handleTypeScreenChange={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
