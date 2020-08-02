import React from 'react';
import renderer from 'react-test-renderer';

import VideoPlayer from './video-player.jsx';

const isPlaying = false;
const posterImage = `picture.jpg`;
const previewVideo = `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`;

describe(`VideoPlayerComponent`, () => {
  it(`VideoPlayerComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <VideoPlayer
            isPlaying={isPlaying}
            posterImage={posterImage}
            previewVideo={previewVideo}
            handleVideoPlayerMouseOver={() => {}}
            handleVideoPlayerMouseOut={() => {}}
          >
            <video />
          </ VideoPlayer>, {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
