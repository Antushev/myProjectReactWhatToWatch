import {reducer, ActionCreator} from './app-state.js';
import {TypeScreen} from "../../utils/const";

const state = {
  typeScreenActive: TypeScreen.MAIN_SCREEN,
  showFilmCardCount: 8,
};

describe(`Tests reducer`, () => {
  it(`Show films count`, () => {
    const newStateWithShowCard = Object.assign({}, state, {
      showFilmCardCount: 10
    });

    expect(reducer(newStateWithShowCard, ActionCreator.resetFilmCardCount())).toEqual(state);
  });

  it(`Change type screen`, () => {
    const newTypeScreen = TypeScreen.ADD_REVIEW;

    const newState = Object.assign({}, state, {
      typeScreenActive: newTypeScreen
    });

    expect(reducer(state, ActionCreator.changeTypeScreen(TypeScreen.ADD_REVIEW))).toEqual(newState);
  });
});
