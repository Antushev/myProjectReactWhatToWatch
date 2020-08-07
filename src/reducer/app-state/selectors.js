import {NameSpace} from './../name-space.js';

const getTypeScreenActive = (state) => {
  return state[NameSpace.APP_STATE].typeScreenActive;
};

const getShowFilmCardCount = (state) => {
  return state[NameSpace.APP_STATE].showFilmCardCount;
};

export {getShowFilmCardCount, getTypeScreenActive};
