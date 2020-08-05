import {AuthorizationStatus} from '../../utils/const.js';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH
};

const ActionType = {

  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`
};

const ActionCreator = {
  requireAuthorization(authorizationStatus) {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: authorizationStatus
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.type
      });
  }

  return state;
};

export {reducer, ActionCreator};
