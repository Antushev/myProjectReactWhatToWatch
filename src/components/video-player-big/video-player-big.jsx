import React from 'react';
import PropTypes from 'prop-types';
import {formatVideoElapsed} from '../../utils/common.js';

const getPositionToggler = (progress) => {
  const progressString = `${progress}%`;

  return {
    left: progressString
  };
};

const VideoPlayerBig = (props) => {
  const {
    children,
    isPlaying,
    videoProgress,
    videoTimeElapsed,
    handlePlayClick,
    handleExitVideoPlayerClick,
    handleFullScreenClick
  } = props;
  console.log(isPlaying);
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
            <progress className="player__progress" value={videoProgress} max="100" />
            <div className="player__toggler" style={getPositionToggler(videoProgress)}>Toggler</div>
          </div>
          <div className="player__time-value">{formatVideoElapsed(videoTimeElapsed)}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={handlePlayClick}
          >
            {isPlaying ?
              <svg viewBox="0 0 14 21" width="19" height="19">
                <use xlinkHref="#pause" />
              </svg>
              :
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s" />
              </svg>
            }
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={handleFullScreenClick}
          >
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
  isPlaying: PropTypes.bool.isRequired,
  posterImage: PropTypes.string.isRequired,
  videoMain: PropTypes.string.isRequired,
  videoProgress: PropTypes.number.isRequired,
  videoTimeElapsed: PropTypes.number.isRequired,
  handlePlayClick: PropTypes.func.isRequired,
  handleExitVideoPlayerClick: PropTypes.func.isRequired,
  handleFullScreenClick: PropTypes.func.isRequired
};

export default VideoPlayerBig;
