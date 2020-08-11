import * as React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../utils/const';

import {UserMaximum} from '../../utils/types';

interface Props {
  user: UserMaximum,
  authorizationStatus: string
}

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

const UserProfile: React.FunctionComponent<Props> = (props:Props) => {
  const {user, authorizationStatus} = props;

  return (
    <div className="user-block">
      {renderUserProfile(user, authorizationStatus)}
    </div>
  );
};

export default UserProfile;
