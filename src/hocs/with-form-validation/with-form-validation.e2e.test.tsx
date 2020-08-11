import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import {withFormValidation} from './with-form-validation';

configure({adapter: new Adapter()});

interface Props {
  buttonDisabled: boolean;
  handleEmailInputChange: () => void;
  handlePasswordInputChange: () => void;
}

const MockForm: React.FunctionComponent<Props> = (props: Props) => {
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

describe(`Test button disabled tag from`, () => {
  it(`Test button disabled default`, () => {
    const MockFormWrapped = withFormValidation(MockForm);
    const onEmailInputChange = jest.fn();
    const onPasswordInputChange = jest.fn();

    const wrapped = mount(
        <MockFormWrapped
          buttonDisabled={true}
          onEmailInputChange={onEmailInputChange}
          onPasswordInputChange={onPasswordInputChange}
        />
    );

    wrapped.find(`.email`).simulate(`change`, {target: {value: `example@mail.ru`}});
    wrapped.find(`.password`).simulate(`change`, {target: {value: `1111`}});

    expect(wrapped.find(`button`).prop(`disabled`)).toBe(true);
  });
});
