import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Operation as UserOperation} from './../../reducer/user/user';
import {ActionCreator as AppStateActionCreator} from './../../reducer/app-state/app-state';
import {getAuthorizeStatusUser} from './../../reducer/user/selectors';

import {AppRoute} from "./../../utils/const";

interface Props {
  buttonDisabled: boolean;
  onAuthorizeClick: (email: string, password: string) => void;
  onTypeScreenChange: (typeScreen: string) => void;
  onChangeInputEmail: (email: string) => void;
  onChangeInputPassword: (password: string) => void;
}

const SignIn: React.FunctionComponent<Props> = (props: Props) => {
  const {
    buttonDisabled,
    onAuthorizeClick,
    onChangeInputEmail,
    onChangeInputPassword
  } = props;

  const refInputLogin = React.createRef<HTMLInputElement>();
  const refInputPassword = React.createRef<HTMLInputElement>();

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={`${AppRoute.MAIN}`} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email" placeholder="Email address"
                name="user-email"
                id="user-email"
                ref={refInputLogin}
                onChange={() => onChangeInputEmail(refInputLogin.current.value)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password" placeholder="Password"
                name="user-password"
                id="user-password"
                ref={refInputPassword}
                onChange={() => onChangeInputPassword(refInputPassword.current.value)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button
              className="sign-in__btn"
              type="submit"
              onClick={(evt) => {
                evt.preventDefault();

                const login = refInputLogin.current.value;
                const password = refInputPassword.current.value;

                onAuthorizeClick(login, password);
              }}
              disabled={buttonDisabled}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizeStatusUser(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onAuthorizeClick(email, password) {
    dispatch(UserOperation.loginUser(email, password));
  },

  onTypeScreenChange(typeScreen) {
    dispatch(AppStateActionCreator.changeTypeScreen(typeScreen));
  }
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
