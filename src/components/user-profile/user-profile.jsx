import React from 'react';
import PropTypes from 'prop-types';
import {AuthorizationStatus, TypeScreen} from '../../utils/const';

import {userShape} from './../../utils/shapes.js';

const BASE_URL_AVATAR = `https://4.react.pages.academy`;

const handleLinkSignInClick = (handleSignInClick) => (evt) => {
  evt.preventDefault();

  handleSignInClick(TypeScreen.SIGN_IN);
};

const renderUserProfile = (user, authorizationStatus, handleTypeScreenChange) => {
  const {avatar} = user;
  return authorizationStatus === AuthorizationStatus.NO_AUTH ?
    <a
      href="sign-in.html"
      className="user-block__link"
      onClick={handleLinkSignInClick(handleTypeScreenChange)}
    >
      Sign in
    </a> :
    <div className="user-block__avatar">
      <img src={`${avatar !== null ? BASE_URL_AVATAR + avatar : BASE_URL_AVATAR}`} alt="User avatar" width="63" height="63"/>
    </div>;
};

const UserProfile = (props) => {
  const {user, authorizationStatus, handleTypeScreenChange} = props;

  return (
    <div className="user-block">
      {renderUserProfile(user, authorizationStatus, handleTypeScreenChange)}
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  handleTypeScreenChange: PropTypes.func.isRequired
};

export default UserProfile;
