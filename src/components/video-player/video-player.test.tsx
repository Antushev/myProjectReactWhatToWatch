import * as React from 'react';
import * as renderer from 'react-test-renderer'

import {noop} from '../../utils/const';

import VideoPlayer from './video-player';

const isPlaying = false;
const posterImage = `picture.jpg`;
const previewVideo = `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`;

describe(`VideoPlayerComponent`, () => {
  it(`VideoPlayerComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <VideoPlayer
            handleVideoPlayerPlay={noop}
            handleVideoPlayerPause={noop}
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
