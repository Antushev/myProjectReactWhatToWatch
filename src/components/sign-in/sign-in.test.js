import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history.js';

import {SignIn} from './sign-in';

describe(`SignInComponent`, () => {
  it(`SignInComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <SignIn
              buttonDisabled={true}
              onAuthorizeClick={() => {}}
              onTypeScreenChange={() => {}}
              onChangeInputEmail={() => {}}
              onChangeInputPassword={() => {}}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
