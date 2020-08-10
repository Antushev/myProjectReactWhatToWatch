import React from 'react';
import renderer from 'react-test-renderer';

import {user} from './../../mocks-test/user-test.js';

import MyList from './my-list.jsx';

describe(`MyListComponent`, () => {
  it(`MyListComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <MyList
            user={user}
            authorizationStatus={`AUTH`}
          />
      )
      .toJSON();
  });
});
