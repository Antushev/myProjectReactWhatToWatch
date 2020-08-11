import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history.js';

import {user} from './../../mocks-test/user-test.js';

import UserProfile from './user-profile';

describe(`UserProfileComponent`, () => {
  it(`UserProfileComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <UserProfile
              user={user}
              authorizationStatus={`AUTH`}
              onTypeScreenChange={() => {}}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
