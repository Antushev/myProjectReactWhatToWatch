import React, {PureComponent} from 'react';

const withFormValidation = (Component) => {
  class WithFormValidation extends PureComponent {
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
        handleChangeInputEmail={this._handleChangeInputEmail}
        handleChangeInputPassword={this._handleChangeInputPassword}
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
