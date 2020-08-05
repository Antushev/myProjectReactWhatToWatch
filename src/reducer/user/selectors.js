import {NameSpace} from './../name-space.js';

const getAuthorizeStatusUser = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

const getUserInfo = (state) => {
  return state[NameSpace.USER].user;
};

export {getAuthorizeStatusUser, getUserInfo};
