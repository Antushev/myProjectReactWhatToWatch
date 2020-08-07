import React from 'react';
import renderer from 'react-test-renderer';

import {withFormValidation} from './with-form-validation';

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withFormValidation(MockComponent);

describe(`Tests HOC with-form-validation`, () => {
  it(`Test HOC with-form-validation`, () => {
    const tree = renderer
      .create(
          <MockComponentWrapped
            buttonDisabled={true}
            handleChangeInputEmail={() => {}}
            handleChangeInputPassword={() => {}}
          />, {
            createNodeMock() {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
