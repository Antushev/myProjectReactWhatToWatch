import {reducer, ActionCreator} from './app-state.js';

const state = {
  showFilmCardCount: 8
};

describe(`Tests reducer`, () => {
  it(`Show film   ds count`, () => {
    const newStateWithShowCard = Object.assign({}, state, {
      showFilmCardCount: 10
    });

    expect(reducer(newStateWithShowCard, ActionCreator.resetFilmCardCount())).toEqual(state);
  });
});
