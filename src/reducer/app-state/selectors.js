import {NameSpace} from './../name-space.js';

const getShowFilmCardCount = (state) => {
  return state[NameSpace.APP_STATE].showFilmCardCount;
};

export {getShowFilmCardCount};
