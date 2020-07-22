import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const TIMEOUT_PLAY_VIDEO = 1000;

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._idTimer = null;

    this._videoRef = React.createRef();

    this.state = {
      isPlaying: this.props.isPlaying
    };
  }

  componentDidMount() {
    const {posterImage, previewVideo} = this.props;

    const video = this._videoRef.current;

    video.src = previewVideo;
    video.poster = `img/${posterImage}`;
    video.load();

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

  render() {
    const {handleFilmCardMouseOver, handleFilmCardMouseOut} = this.props;
    return (
      <div
        className="small-movie-card__image"
        onMouseOver={handleFilmCardMouseOver}
        onMouseOut={handleFilmCardMouseOut}
      >
        <video className="player__video" ref={this._videoRef} muted="muted"/>;
      </div>
    );
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

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  posterImage: PropTypes.string.isRequired,
  previewVideo: PropTypes.string.isRequired,
  handleFilmCardMouseOver: PropTypes.func.isRequired,
  handleFilmCardMouseOut: PropTypes.func.isRequired
};
