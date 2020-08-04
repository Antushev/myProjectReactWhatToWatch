import React, {PureComponent} from 'react';

const withVideoPlayerBig = (Component) => {
  class WithVideoPlayerBig extends PureComponent {
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
          handlePlayClick={this._handlePlayClick}
        />
      );
    }

    _handlePlayClick() {
      this.setState((prevState) => {
        return {isPlaying: !prevState.isPlaying};
      });
    }
  }

  WithVideoPlayerBig.propTypes = {};

  return WithVideoPlayerBig;
};

export {withVideoPlayerBig};
