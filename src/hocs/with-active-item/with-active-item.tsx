import * as React from 'react';
import {Subtract} from 'utility-types';

interface State {
  activeItem: string;
}

interface InjectingProps {
  activeItem: string;
  onActiveItemChange: (newActionItem: string) => void;
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveItem extends React.PureComponent<T, State> {
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

  return WithActiveItem;
};

export {withActiveItem};
