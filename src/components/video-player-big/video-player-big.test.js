import React from 'react';
import renderer from 'react-test-renderer';

import VideoPlayerBig from './video-player-big.jsx';

const posterImage = `img/poster.jpg`;
const videoMain = `video/video-main.mp4`;

describe(`VideoPlayerBigComponent`, () => {
  it(`VideoPlayerBigComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <VideoPlayerBig
            isPlaying={false}
            posterImage={posterImage}
            videoMain={videoMain}
            videoProgress={40}
            videoTimeElapsed={40}
            onPlayClick={() => {}}
            onExitVideoPlayerClick={() => {}}
            onFullScreenClick={() => {}}
          >
            <video />
          </VideoPlayerBig>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
