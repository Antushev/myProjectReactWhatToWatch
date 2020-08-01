import React, {PureComponent} from 'react';

import VideoPlayer from './../../components/video-player/video-player.jsx';

import {withVideo} from '../with-video/with-video.jsx';

const VideoPlayerWrapped = withVideo(VideoPlayer);

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };

      this._handleVideoPlayerMouseOver = this._handleVideoPlayerMouseOver.bind(this);
      this._handleVideoPlayerMouseOut = this._handleVideoPlayerMouseOut.bind(this);
    }

    render() {
      const {isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          renderVideoPlayer={(posterImage, previewVideo) => {
            return (
              <VideoPlayerWrapped
                isPlaying={isPlaying}
                posterImage={posterImage}
                previewVideo={previewVideo}
                handleVideoPlayerMouseOver={this._handleVideoPlayerMouseOver}
                handleVideoPlayerMouseOut={this._handleVideoPlayerMouseOut}
              />
            );
          }}
        />
      );
    }

    _handleVideoPlayerMouseOver() {
      this.setState((prevState) => {
        return {isPlaying: !prevState.isPlaying};
      });
    }

    _handleVideoPlayerMouseOut() {
      this.setState((prevState) => {
        return {isPlaying: !prevState.isPlaying};
      });
    }
  }

  return WithVideoPlayer;
};

export {withVideoPlayer};
