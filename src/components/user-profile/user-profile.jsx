import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../utils/const';

import {userShape} from './../../utils/shapes.js';

const BASE_URL_AVATAR = `https://4.react.pages.academy`;

const renderUserProfile = (user, authorizationStatus) => {
  const {avatar} = user;
  return authorizationStatus === AuthorizationStatus.NO_AUTH ?
    <Link className="user-block__link"
      to={AppRoute.LOGIN}
    >
      Sign in
    </Link> :
    <Link to={AppRoute.MY_LIST}>
      <div className="user-block__avatar">
        <img src={`${avatar !== null ? BASE_URL_AVATAR + avatar : BASE_URL_AVATAR}`} alt="User avatar" width="63" height="63"/>
      </div>
    </Link>;
};

const UserProfile = (props) => {
  const {user, authorizationStatus} = props;

  return (
    <div className="user-block">
      {renderUserProfile(user, authorizationStatus)}
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

export default UserProfile;
