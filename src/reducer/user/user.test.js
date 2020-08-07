import {reducer, ActionCreator} from './user.js';

const state = {
  authorizationStatus: `NO_AUTH`,
  user: {
    id: -1,
    name: ``,
    email: ``,
    avatar: ``
  }
};

describe(`Tests reducer user`, () => {
  it(`Check authorization status`, () => {
    const newState = Object.assign({}, state, {
      authorizationStatus: `AUTH`
    });

    expect(reducer(state, ActionCreator.requireAuthorization(`AUTH`))).toEqual(newState);
  });
});
