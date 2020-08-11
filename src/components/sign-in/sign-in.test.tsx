import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history';

import {noop} from '../../utils/const';

import {SignIn} from './sign-in';

describe(`SignInComponent`, () => {
  it(`SignInComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <SignIn
              buttonDisabled={true}
              onAuthorizeClick={noop}
              onTypeScreenChange={noop}
              onChangeInputEmail={noop}
              onChangeInputPassword={noop}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
