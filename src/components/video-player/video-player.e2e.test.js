import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {film} from '../../mocks-test/films-test.js';

import VideoPlayer from './video-player.jsx';

configure({adapter: new Adapter()});

const posterImage = film.previewImage;
const previewVideo = film.previewVideo;
const isPlaying = false;

describe(`VideoPlayerComponentE2E`, () => {
  it(`Correct playing video`, () => {
    const handleFilmCardMouseOver = jest.fn();
    const handleFilmCardMouseOut = jest.fn();

    const videoContainer = mount(
        <VideoPlayer
          isPlaying={isPlaying}
          posterImage={posterImage}
          previewVideo={previewVideo}
          handleFilmCardMouseOver={handleFilmCardMouseOver}
          handleFilmCardMouseOut={handleFilmCardMouseOut}
        />
    );

    const videoPlayer = videoContainer.find(`.player__video`);

    videoPlayer.simulate(`play`);
    expect(videoContainer.state().isPlaying).toEqual(false);
  });
});
