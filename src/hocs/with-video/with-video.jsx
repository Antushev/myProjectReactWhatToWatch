import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {TypeVideoPlayer} from './../../utils/const.js';

const TIMEOUT_PLAY_VIDEO = 1000;

const withVideo = (Component, typeVideoPlayer) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
        timeElapsed: 0,
        progress: 1
      };

      this._videoRef = React.createRef();

      this._handleFullScreenClick = this._handleFullScreenClick.bind(this);
    }

    render() {
      clearTimeout(this._idTimer);
      const {progress, timeElapsed} = this.state;
      return (
        <Component
          {...this.props}
          videoProgress={progress}
          videoTimeElapsed={timeElapsed}
          handleFullScreenClick={this._handleFullScreenClick}
        >
          <video className="player__video" ref={this._videoRef} muted="muted"/>;
        </Component>
      );
    }

    componentDidMount() {
      const {posterImage, previewVideo, videoMain} = this.props;

      const video = this._videoRef.current;

      video.src = typeVideoPlayer === TypeVideoPlayer.SMALL_VIDEO_PLAYER ?
        previewVideo : videoMain;
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

      video.ontimeupdate = () => {
        const progress = Math.floor((video.currentTime / video.duration) * 100);
        const timeElapsed = Math.floor(video.duration - video.currentTime);
        this.setState({
          progress,
          timeElapsed
        });
      };
    }

    componentDidUpdate() {
      const {isPlaying} = this.props;
      const video = this._videoRef.current;

      if (isPlaying) {
        this._changeActionPlayForPlayers(video);
      } else {
        this._changeActionPauseForPlayers(video);
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.src = ``;
      video.poster = ``;
      video.onplay = null;
      video.onloadeddata = null;
      video.ontimeupdate = null;

      if (this._idTimer) {
        clearTimeout(this._idTimer);
      }
    }

    _changeActionPlayForPlayers(video) {
      switch (typeVideoPlayer) {
        case TypeVideoPlayer.SMALL_VIDEO_PLAYER:
          this._idTimer = setTimeout(() => {
            video.play();
          }, TIMEOUT_PLAY_VIDEO);
          break;
        case TypeVideoPlayer.BIG_VIDEO_PLAYER:
          video.play();
          break;
        default:
          video.play();
      }
    }

    _changeActionPauseForPlayers(video) {
      switch (typeVideoPlayer) {
        case TypeVideoPlayer.SMALL_VIDEO_PLAYER:
          clearTimeout(this._idTimer);
          video.load();
          break;
        case TypeVideoPlayer.BIG_VIDEO_PLAYER:
          video.pause();
          break;
        default:
          clearTimeout(this._idTimer);
          video.load();
      }
    }

    _handleFullScreenClick() {
      const video = this._videoRef.current;

      if (!document.fullscreenElement) {
        video.requestFullscreen().catch((err) => err);
      } else {
        document.exitFullscreen().catch((err) => err);
      }
    }
  }

  WithVideo.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    posterImage: PropTypes.string.isRequired,
    previewVideo: PropTypes.string,
    videoMain: PropTypes.string
  };

  return WithVideo;
};

export {withVideo};
