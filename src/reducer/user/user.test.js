import MockAdapter from 'axios-mock-adapter';
import {createApi} from './../../api.js';
import {reducer, ActionCreator, Operation} from './user.js';

import {user} from '../../mocks-test/user-test.js';

const state = {
  authorizationStatus: `NO_AUTH`,
  user: {
    id: -1,
    name: ``,
    email: ``,
    avatar: ``
  }
};

const login = `sdvsav@mail.ru`;
const password = `svavasv`;

const api = createApi(() => {});

describe(`Tests reducer user`, () => {
  it(`Check authorization status`, () => {
    const newState = Object.assign({}, state, {
      authorizationStatus: `AUTH`
    });

    expect(reducer(state, ActionCreator.requireAuthorization(`AUTH`))).toEqual(newState);
  });

  it(`Check login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const userLogin = Operation.loginUser();

    apiMock
      .onPost(`/login`, {
        login,
        password
      })
      .reply(200, [user]);


    return userLogin(dispatch, () => {}, apiMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalled(2);
      });
  });
});
