import React from 'react';
import PropTypes from 'prop-types';

const styleToggler = {
  left: `30%`
};

const getTimeLeft = (currentTime, duration) => {
  return Math.floor(currentTime / duration);
}

const VideoPlayerBig = (props) => {
  const {
    children,
    durationVideo,
    currentTimeVideo,
    handlePlayClick,
    handleExitVideoPlayerClick
  } = props;

  const timeLeft = getTimeLeft(currentTimeVideo, durationVideo);

  return (
    <div className="player">
      {children}

      <button
        type="button" className="player__exit"
        onClick={handleExitVideoPlayerClick}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={timeLeft} max="100" />
            <div className="player__toggler" style={styleToggler}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={handlePlayClick}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s" />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

VideoPlayerBig.propTypes = {
  children: PropTypes.node.isRequired,
  posterImage: PropTypes.string.isRequired,
  videoMain: PropTypes.string.isRequired,
  handlePlayClick: PropTypes.func.isRequired,
  handleExitVideoPlayerClick: PropTypes.func.isRequired
};

export default VideoPlayerBig;
