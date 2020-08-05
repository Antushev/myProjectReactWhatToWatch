import {NameSpace} from './../name-space.js';

const getLoadingStatus = (state) => {
  return state[NameSpace.DATA].isLoading;
};

const getErrorStatus = (state) => {
  return state[NameSpace.DATA].isError;
};

const getFilms = (state) => {
  return state[NameSpace.DATA].films;
};

export {getLoadingStatus, getErrorStatus, getFilms};
