import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: props.activeItem
      };
    }

    render() {
      const {activeItem} = this.state;

      return (
        <Component
          {...this.props}
          activeItem={activeItem}
          handleActiveItemChange={(newActiveItem) => {
            if (newActiveItem !== activeItem) {
              this.setState({
                activeItem: newActiveItem
              });
            }
          }}
        />
      );
    }
  }

  WithActiveItem.propTypes = {
    activeItem: PropTypes.string.isRequired
  };

  return WithActiveItem;
};

export {withActiveItem};
