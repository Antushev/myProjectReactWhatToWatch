import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = (props) => {
  const {children, handleVideoPlayerMouseOut, handleVideoPlayerMouseOver} = props;
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

VideoPlayer.propTypes = {
  children: PropTypes.node.isRequired,
  handleVideoPlayerMouseOver: PropTypes.func.isRequired,
  handleVideoPlayerMouseOut: PropTypes.func.isRequired
};

export default VideoPlayer;
