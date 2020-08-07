import React, {PureComponent} from 'react';

const withFormValidation = (Component) => {
  class WithFormValidation extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        inputEmail: ``,
        inputPassword: ``,
        buttonActive: true
      };

      this._handleChangeInputEmail = this._handleChangeInputEmail.bind(this);
      this._handleChangeInputPassword = this._handleChangeInputPassword.bind(this);
    }

    render() {
      const {buttonActive} = this.state;

      return <Component
        {...this.props}
        buttonActive={buttonActive}
        handleChangeInputEmail={this._handleChangeInputEmail}
        handleChangeInputPassword={this._handleChangeInputPassword}
      />;
    }

    _handleChangeInputEmail(value) {
      const {inputPassword} = this.state;

      if (inputPassword !== `` && value !== ``) {
        this.setState({
          buttonActive: false
        });
      } else {
        this.setState({
          inputEmail: value
        });
      }
    }

    _handleChangeInputPassword(value) {
      const {inputEmail} = this.state;

      if (inputEmail !== `` && value !== ``) {
        this.setState({
          buttonActive: false
        });
      } else {
        this.setState({
          inputEmail: value
        });
      }
    }
  }

  return WithFormValidation;
};

export {withFormValidation};