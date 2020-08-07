import React from 'react';
import renderer from 'react-test-renderer';

import {SignIn} from './sign-in.jsx';

describe(`SignInComponent`, () => {
  it(`SignInComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <SignIn
            buttonDisabled={true}
            handleAuthorizeClick={() => {}}
            onTypeScreenChange={() => {}}
            handleChangeInputEmail={() => {}}
            handleChangeInputPassword={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
