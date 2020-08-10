import React from 'react';
import PropTypes from 'prop-types';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {withFormValidation} from './with-form-validation';

configure({adapter: new Adapter()});

const MockForm = (props) => {
  const {buttonDisabled, handleEmailInputChange, handlePasswordInputChange} = props;

  return (
    <form>
      <input
        className="email"
        type="email"
        onChange={handleEmailInputChange}
      />
      <input
        className="password"
        type="password"
        onChange={handlePasswordInputChange}
      />
      <button
        disabled={buttonDisabled}
      />
    </form>
  );
};

MockForm.propTypes = {
  buttonDisabled: PropTypes.bool.isRequired,
  handleEmailInputChange: PropTypes.func.isRequired,
  handlePasswordInputChange: PropTypes.func.isRequired
};

describe(`Test button disabled tag from`, () => {
  it(`Test button disabled default`, () => {
    const MockFormWrapped = withFormValidation(MockForm);

    const wrapped = mount(
        <MockFormWrapped
          buttonDisabled={true}
          onEmailInputChange={() => {}}
          onPasswordInputChange={() => {}}
        />
    );

    wrapped.find(`.email`).simulate(`change`, {target: {value: `example@mail.ru`}});
    wrapped.find(`.password`).simulate(`change`, {target: {value: `1111`}});

    expect(wrapped.find(`button`).prop(`disabled`)).toBe(true);
  });
});
