import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import VideoPlayer from './video-player';

configure({adapter: new Adapter()});

describe(`VideoPlayerComponentE2E`, () => {
  it(`Correct playing video`, () => {
    const handleVideoPlayerPlay = jest.fn();
    const handleVideoPlayerPause = jest.fn();

    const videoContainer = mount(
        <VideoPlayer
          handleVideoPlayerPlay={handleVideoPlayerPlay}
          handleVideoPlayerPause={handleVideoPlayerPause}
        >
          <video />
        </VideoPlayer>
    );

    const videoPlayer = videoContainer.find(`.small-movie-card__image`);

    videoPlayer.simulate(`mouseover`);
    videoPlayer.simulate(`mouseout`);

    expect(handleVideoPlayerPlay).toBeCalled();

    expect(handleVideoPlayerPause).toBeCalled();
  });
});
