import React, {PureComponent} from 'react';

import VideoPlayer from './../../components/video-player/video-player.jsx';

import {withVideo} from '../with-video/with-video.jsx';

const withVideoPlayer = (Component, typeVideoPlayer) => {
  const VideoPlayerWrapped = withVideo(VideoPlayer, typeVideoPlayer);
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };

      this._handleVideoPlayerPlay = this._handleVideoPlayerPlay.bind(this);
      this._handleVideoPlayerPause = this._handleVideoPlayerPause.bind(this);
    }

    render() {
      const {isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          renderVideoPlayer={(posterImage, previewVideo, videoMain) => {
            return (
              <VideoPlayerWrapped
                isPlaying={isPlaying}
                posterImage={posterImage}
                previewVideo={previewVideo}
                videoMain={videoMain}
                handleVideoPlayerPlay={this._handleVideoPlayerPlay}
                handleVideoPlayerPause={this._handleVideoPlayerPause}
              />
            );
          }}
        />
      );
    }

    _handleVideoPlayerPlay() {
      this.setState((prevState) => {
        return {isPlaying: !prevState.isPlaying};
      });
    }

    _handleVideoPlayerPause() {
      this.setState((prevState) => {
        return {isPlaying: !prevState.isPlaying};
      });
    }
  }

  return WithVideoPlayer;
};

export {withVideoPlayer};
