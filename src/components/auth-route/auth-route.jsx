import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from './../../utils/const.js';
import {getAuthorizeStatusUser} from './../../reducer/user/selectors.js';

const AuthRoute = (props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(routerProps) => {
        return (
          authorizationStatus === AuthorizationStatus.NO_AUTH
            ? render(routerProps)
            : <Redirect to={AppRoute.MAIN} />
        );
      }}
    />
  );
};

AuthRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizeStatusUser(state)
  };
};

export {AuthRoute};
export default connect(mapStateToProps, null)(AuthRoute);
