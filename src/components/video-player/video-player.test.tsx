import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {noop} from '../../utils/const';

import VideoPlayer from './video-player';

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
