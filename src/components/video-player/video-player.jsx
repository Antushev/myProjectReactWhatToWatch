import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const TIMEOUT_PLAY_VIDEO = 1000;

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._idTimeout = null;

    this._videoRef = React.createRef();
  }

  componentDidMount() {
    const {posterImage, previewVideo} = this.props;

    const video = this._videoRef.current;

    video.src = previewVideo;
    video.poster = `img/${posterImage}`;
  }

  render() {
    return <video className="player__video" ref={this._videoRef} />;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.currentTime = 0;
    video.onpause = null;
    video.onplay = null;
  }

  componentDidUpdate() {
    const {isPlaying} = this.props;
    const video = this._videoRef.current;

    if (isPlaying) {
      this._idTimeout = setTimeout(() => {
        video.play();
      }, TIMEOUT_PLAY_VIDEO);
    } else {
      clearTimeout(this._idTimeout);
      video.load();
    }
  }
}

VideoPlayer.propTypes = {
  posterImage: PropTypes.string.isRequired,
  previewVideo: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired
};
