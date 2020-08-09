import React from 'react';
import PropTypes from 'prop-types';
import {TypeScreen} from '../../utils/const.js';
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
    onPlayClick,
    onExitVideoPlayerClick,
    onFullScreenClick
  } = props;

  return (
    <div className="player">
      {children}

      <button
        type="button" className="player__exit"
        onClick={() => onExitVideoPlayerClick(TypeScreen.MAIN_SCREEN)}
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
            onClick={onPlayClick}
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
            onClick={onFullScreenClick}
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
  onPlayClick: PropTypes.func.isRequired,
  onExitVideoPlayerClick: PropTypes.func.isRequired,
  onFullScreenClick: PropTypes.func.isRequired
};

export default VideoPlayerBig;
