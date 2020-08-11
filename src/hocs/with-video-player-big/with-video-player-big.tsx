import * as React from 'react';
import {Subtract} from 'utility-types';

interface State {
  isPlaying: boolean
}

interface InjectingProps {
  isPlaying: boolean,
  onPlayClick: () => void
}

const withVideoPlayerBig = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithVideoPlayerBig extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };

      this._handlePlayClick = this._handlePlayClick.bind(this);
    }

    render() {
      const {isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          onPlayClick={this._handlePlayClick}
        />
      );
    }

    _handlePlayClick() {
      this.setState((prevState) => {
        return {isPlaying: !prevState.isPlaying};
      });
    }
  }

  return WithVideoPlayerBig;
};

export {withVideoPlayerBig};
