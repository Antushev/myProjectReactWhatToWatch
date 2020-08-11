import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {TypeVideoPlayer} from '../../utils/const';

import {film} from '../../mocks-test/films-t';

import {withVideo} from './with-video';

configure({adapter: new Adapter()});

const previewImage = `src/picture.jpg`;
const previewVideo = `src/video.mp4`;


interface Props {
  children: React.ReactNode,
  handleVideoPlayerMouseOver: () => void,
  handleVideoPlayerMouseOut: () => void
}

const MockVideo: React.FunctionComponent<Props> = (props:Props) => {
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

describe(`Tests HOC with-video`, () => {
  it(`Test HOC with-video play`, () => {
    const MockVideoWrapped = withVideo(MockVideo, TypeVideoPlayer.SMALL_VIDEO_PLAYER);

    const wrapper = mount(
        <MockVideoWrapped
          filmActive={film}
          isPlaying={false}
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

    wrapper.find(`.small-movie-card__image`).simulate(`mouseover`);

    setTimeout(() => {
      expect(_videoRef.current.play).toHaveBeenCalledTimes(0);
    }, 1000);
  });

  it(`Test HOC with-video pause`, () => {
    const MockVideoWrapped = withVideo(MockVideo, TypeVideoPlayer.SMALL_VIDEO_PLAYER);

    const wrapper = mount(
        <MockVideoWrapped
          filmActive={film}
          isPlaying={false}
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
