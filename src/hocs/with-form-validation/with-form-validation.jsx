import React, {PureComponent} from 'react';

const regularForEmail = `^(?![^@]*\\.-)[a-zA-Z][A-Za-z0-9._-]+@[A-Za-z0-9]+\\.[A-Za-z]{2,6}\\b`;


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

      if (inputPassword !== `` && value !== `` && value.search(regularForEmail) !== -1) {
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

      if (inputEmail !== `` && value !== `` && inputEmail.search(regularForEmail) !== -1) {
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
