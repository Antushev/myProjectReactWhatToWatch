import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from './../../utils/const';
import {getAuthorizeStatusUser} from './../../reducer/user/selectors';

interface Props {
  path: string,
  exact: boolean,
  authorizationStatus: string,
  render: (obj: any) => React.ReactNode
}

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(routerProps) => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(routerProps)
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizeStatusUser(state)
  };
};

export {PrivateRoute};
export default connect(mapStateToProps, null)(PrivateRoute);
