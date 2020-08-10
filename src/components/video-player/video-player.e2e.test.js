import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {film} from '../../mocks-test/films-test.js';

import VideoPlayer from './video-player';

configure({adapter: new Adapter()});

const posterImage = film.previewImage;
const previewVideo = film.previewVideo;
const isPlaying = false;

describe(`VideoPlayerComponentE2E`, () => {
  it(`Correct playing video`, () => {
    const handleVideoPlayerPlay = jest.fn();
    const handleVideoPlayerPause = jest.fn();

    const videoContainer = mount(
        <VideoPlayer
          isPlaying={isPlaying}
          posterImage={posterImage}
          previewVideo={previewVideo}
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
