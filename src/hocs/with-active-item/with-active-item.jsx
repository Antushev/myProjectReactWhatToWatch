import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: props.activeItem
      };

      this._handleActiveItemChange = this._handleActiveItemChange.bind(this);
    }

    render() {
      const {activeItem} = this.state;

      return (
        <Component
          {...this.props}
          activeItem={activeItem}
          onActiveItemChange={this._handleActiveItemChange}
        />
      );
    }

    _handleActiveItemChange(newActiveItem) {
      const {activeItem} = this.state;

      if (newActiveItem !== activeItem) {
        this.setState({
          activeItem: newActiveItem
        });
      }
    }
  }

  WithActiveItem.propTypes = {
    activeItem: PropTypes.string.isRequired
  };

  return WithActiveItem;
};

export {withActiveItem};
