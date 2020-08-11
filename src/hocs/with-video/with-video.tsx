import * as React from 'react';
import {connect} from 'react-redux';
import {Subtract} from 'utility-types';

import {getFilmActive} from './../../reducer/data/selectors';

import {TypeVideoPlayer} from './../../utils/const';

interface State {
  isPlaying: boolean,
  timeElapsed: number,
  progress: number
}

interface InjectingProps {
  videoProgress: number,
  videoTimeElapsed: number,
  onFullScreenClick: () => void
}

const TIMEOUT_PLAY_VIDEO = 1000;
const START_TIME_ELAPSED = 0;
const START_PROGRESS = 1;

const withVideo = (Component, typeVideoPlayer) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithVideo extends React.PureComponent<T, State> {
    private _idTimer: NodeJS.Timeout;
    private _videoRef: any;

    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
        timeElapsed: START_TIME_ELAPSED,
        progress: START_PROGRESS
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
          onFullScreenClick={this._handleFullScreenClick}
        >
          <video className="player__video" ref={this._videoRef} muted/>;
        </Component>
      );
    }

    componentDidMount() {
      const {filmActive, posterImage, previewVideo} = this.props;

      const video = this._videoRef.current;

      if (typeVideoPlayer === TypeVideoPlayer.SMALL_VIDEO_PLAYER) {
        video.src = previewVideo;
        video.poster = posterImage;
      } else {
        video.src = filmActive.videoMain;
        video.poster = filmActive.posterImage;
      }


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
      clearTimeout(this._idTimer);
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

  return WithVideo;
};

const mapStateToProps = (state) => {
  return {
    filmActive: getFilmActive(state),
  };
};

export {withVideo};
export default (Component, typeVideoPlayer) => connect(mapStateToProps, null)(withVideo(Component, typeVideoPlayer));
