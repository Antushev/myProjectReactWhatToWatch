import React from 'react';
import PropTypes from 'prop-types';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {withVideo} from './with-video.jsx';

configure({adapter: new Adapter()});

const previewImage = `src/picture.jpg`;
const previewVideo = `src/video.mp4`;

const MockVideo = (props) => {
  const {children, handleVideoPlayerMouseOver, handleVideoPlayerMouseOut} = props;

  return (
    <div
      className="small-movie-card__image"
      onMouseOver={handleVideoPlayerMouseOver}
      onMouseOut={handleVideoPlayerMouseOut}
    >
      {children}
    </div>
  );
};

MockVideo.propTypes = {
  children: PropTypes.node.isRequired,
  handleVideoPlayerMouseOver: PropTypes.func.isRequired,
  handleVideoPlayerMouseOut: PropTypes.func.isRequired
};

describe(`Tests HOC with-video`, () => {
  it(`Test HOC with-video play`, () => {
    const MockVideoWrapped = withVideo(MockVideo);

    const wrapper = mount(
        <MockVideoWrapped
          isPlaying={false}
          posterImage={previewImage}
          previewVideo={previewVideo}
          handleVideoPlayerMouseOver={() => {}}
          handleVideoPlayerMouseOut={() => {}}
        />
    );

    window.HTMLMediaElement.prototype.play = () => {};

    const {_videoRef} = wrapper.instance();

    jest.spyOn(_videoRef.current, `play`);

    wrapper.instance().componentDidMount();

    wrapper.find(`.small-movie-card__image`).simulate(`mouseover`);

    setTimeout(() => {
      expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
    }, 1000);
  });

  it(`Test HOC with-video pause`, () => {
    const MockVideoWrapped = withVideo(MockVideo);

    const wrapper = mount(
        <MockVideoWrapped
          isPlaying={true}
          posterImage={previewImage}
          previewVideo={previewVideo}
          handleVideoPlayerMouseOver={() => {}}
          handleVideoPlayerMouseOut={() => {}}
        />
    );

    window.HTMLMediaElement.prototype.load = () => {};

    const {_videoRef} = wrapper.instance();

    jest.spyOn(_videoRef.current, `load`);

    wrapper.instance().componentDidMount();

    wrapper.find(`.small-movie-card__image`).simulate(`mouseout`);

    setTimeout(() => {
      expect(_videoRef.current.load).toHaveBeenCalledTimes(1);
    }, 1000);
  });
});
