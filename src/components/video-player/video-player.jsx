import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = (props) => {
  const {children, handleVideoPlayerPlay, handleVideoPlayerPause} = props;
  return (
    <div
      className="small-movie-card__image"
      onMouseOver={handleVideoPlayerPlay}
      onMouseOut={handleVideoPlayerPause}
    >
      {children}
    </div>
  );
};

VideoPlayer.propTypes = {
  children: PropTypes.node.isRequired,
  handleVideoPlayerPlay: PropTypes.func.isRequired,
  handleVideoPlayerPause: PropTypes.func.isRequired
};

export default VideoPlayer;
