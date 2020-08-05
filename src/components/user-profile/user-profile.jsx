import React from 'react';
import PropTypes from 'prop-types';
import {AuthorizationStatus} from '../../utils/const';

import {userShape} from './../../utils/shapes.js';

const BASE_URL_AVATAR = `https://4.react.pages.academy`;

const renderUserProfile = (user, authorizeStatus, handleSignInClick) => {
  const {avatar} = user;
  return authorizeStatus === AuthorizationStatus.NO_AUTH ?
    <a
      href="sign-in.html"
      className="user-block__link"
      onClick={(evt) => {
        evt.preventDefault();
        handleSignInClick();
      }}
    >
      Sign in
    </a> :
    <div className="user-block__avatar">
      <img src={`${BASE_URL_AVATAR + avatar}`} alt="User avatar" width="63" height="63"/>
    </div>;
};

const UserProfile = (props) => {
  const {user, authorizeStatus, handleSignInClick} = props;

  return (
    <div className="user-block">
      {renderUserProfile(user, authorizeStatus, handleSignInClick)}
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  authorizeStatus: PropTypes.string.isRequired,
  handleSignInClick: PropTypes.func.isRequired
};

export default UserProfile;
