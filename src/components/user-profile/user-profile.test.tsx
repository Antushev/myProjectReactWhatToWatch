import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history';

import {user} from '../../mocks-test/user-t';

import UserProfile from './user-profile';

const userTest: UserMaximum = user;

describe(`UserProfileComponent`, () => {
  it(`UserProfileComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <UserProfile
              user={userTest}
              authorizationStatus={`AUTH`}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
