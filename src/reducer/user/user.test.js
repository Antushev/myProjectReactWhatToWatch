import {reducer, ActionCreator} from './user.js';

import {user as userTest} from './../../mocks-test/user-t.js';

const state = {
  authorizationStatus: `NO_AUTH`,
  user: userTest
};

describe(`Tests reducer user`, () => {
  it(`Check authorization status`, () => {
    const newState = Object.assign({}, state, {
      authorizationStatus: `AUTH`
    });

    expect(reducer(state, ActionCreator.requireAuthorization(`AUTH`))).toEqual(newState);
  });

  it(`Set user info`, () => {
    const newState = Object.assign({}, state, {
      user: userTest
    });

    expect(reducer(state, ActionCreator.setUserInfo(userTest))).toEqual(newState);
  });
});
