import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const TIMEOUT_PLAY_VIDEO = 1000;

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this._idTimer = null;

      this._videoRef = React.createRef();

      this.state = {
        isPlaying: false
      };
    }

    render() {
      return (
        <Component
          {...this.props}
        >
          <video className="player__video" ref={this._videoRef} muted="muted"/>;
        </Component>
      );
    }

    componentDidMount() {
      const {posterImage, previewVideo} = this.props;

      const video = this._videoRef.current;

      video.src = previewVideo;
      video.poster = `img/${posterImage}`;

      video.onplay = () => {
        this.setState({
          isPlaying: true
        });
      };

      video.onloadeddata = () => {
        this.setState({
          isPlaying: false
        });
      };
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.src = ``;
      video.poster = ``;
      video.onplay = null;
      video.onloadeddata = null;
    }

    componentDidUpdate() {
      const {isPlaying} = this.props;
      const video = this._videoRef.current;

      if (isPlaying) {
        this._idTimer = setTimeout(() => {
          video.play();
        }, TIMEOUT_PLAY_VIDEO);
      } else {
        clearTimeout(this._idTimer);
        video.load();
      }
    }
  }

  WithVideo.propTypes = {
    posterImage: PropTypes.string.isRequired,
    previewVideo: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired
  };


  return WithVideo;
};

export {withVideo};
