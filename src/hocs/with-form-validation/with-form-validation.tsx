import * as React from 'react';
import {Subtract} from 'utility-types';

interface State {
  inputEmail: string;
  inputPassword: string;
  buttonDisabled: boolean;
}

interface InjectingProps {
  buttonDisabled: boolean;
  onChangeInputEmail: (value: string) => void;
  onChangeInputPassword: (value: string) => void;
}

const withFormValidation = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithFormValidation extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        inputEmail: ``,
        inputPassword: ``,
        buttonDisabled: true
      };

      this._handleChangeInputEmail = this._handleChangeInputEmail.bind(this);
      this._handleChangeInputPassword = this._handleChangeInputPassword.bind(this);
    }

    render() {
      const {buttonDisabled} = this.state;

      return <Component
        {...this.props}
        buttonDisabled={buttonDisabled}
        onChangeInputEmail={this._handleChangeInputEmail}
        onChangeInputPassword={this._handleChangeInputPassword}
      />;
    }

    _handleChangeInputEmail(value) {
      const {inputPassword} = this.state;

      if (inputPassword !== `` && value !== ``) {
        this.setState({
          inputEmail: value,
          buttonDisabled: false
        });
      } else {
        this.setState({
          inputEmail: value,
          buttonDisabled: true
        });
      }
    }

    _handleChangeInputPassword(value) {
      const {inputEmail} = this.state;

      if (inputEmail !== `` && value !== ``) {
        this.setState({
          inputPassword: value,
          buttonDisabled: false
        });
      } else {
        this.setState({
          inputPassword: value,
          buttonDisabled: true
        });
      }
    }
  }

  return WithFormValidation;
};

export {withFormValidation};
