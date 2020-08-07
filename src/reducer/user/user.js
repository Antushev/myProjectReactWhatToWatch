import {TypeScreen, AuthorizationStatus} from '../../utils/const.js';

import {ActionCreator as AppStateActionCreator} from '../app-state/app-state.js';

import {userAdapter} from '../../adapters/user-adapter.js';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {}
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  SET_USER_INFO: `SET_USER_INFO`,
  PUT_ERROR: `PUT_ERROR`,
  REMOVE_ERROR: `REMOVE_ERROR`
};

const ActionCreator = {
  requireAuthorization(authorizationStatus) {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: authorizationStatus
    };
  },
  setUserInfo(user) {
    return {
      type: ActionType.SET_USER_INFO,
      payload: user
    };
  }
};

const Operation = {
  checkAuthorizeUser: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  loginUser: (emailUser, passwordUser) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: emailUser,
      password: passwordUser
    })
      .then((response) => {
        const user = userAdapter(response.data);

        dispatch(ActionCreator.setUserInfo(user));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(AppStateActionCreator.changeTypeScreen(TypeScreen.MAIN_SCREEN));
      })
      .catch((err) => {
        throw err;
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload
      });
    case ActionType.SET_USER_INFO:
      return Object.assign({}, state, {
        user: action.payload
      });
  }

  return state;
};

export {reducer, ActionCreator, Operation};
