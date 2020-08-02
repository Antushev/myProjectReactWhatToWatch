import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';

import {withVideo} from './with-video.jsx';

const MockComponent = (props) => {
  const {children} = props;

  return <div>{children}</div>;
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};
const MockComponentWrapped = withVideo(MockComponent);

const posterImage = `src/picture.jpg`;
const previewVideo = `src/video.mp4`;

describe(`Tests HOC with-video`, () => {
  it(`Test HOC with-video`, () => {
    const tree = renderer
      .create(
          <MockComponentWrapped
            isPlaying={false}
            posterImage={posterImage}
            previewVideo={previewVideo}
          />, {
            createNodeMock() {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
