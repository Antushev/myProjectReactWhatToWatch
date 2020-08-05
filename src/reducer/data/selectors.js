import {NameSpace} from './../name-space.js';

const getLoadingStatus = (state) => {
  return state[NameSpace.DATA].isLoading;
};

const getFilms = (state) => {
  return state[NameSpace.DATA].films;
};

export {getFilms, getLoadingStatus};
