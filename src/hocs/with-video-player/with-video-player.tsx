import * as React from 'react';
import {Subtract} from 'utility-types';

import VideoPlayer from '../../components/video-player/video-player';

import withVideo from '../with-video/with-video';

interface State {
  isPlaying: boolean;
}

interface InjectingProps {
  renderVideoPlayer: (posterImage: string, previewVideo: string, videoMain: string) => React.ReactNode;
}

const withVideoPlayer = (Component, typeVideoPlayer) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  const VideoPlayerWrapped = withVideo(VideoPlayer, typeVideoPlayer);
  class WithVideoPlayer extends React.PureComponent<T, State> {
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
