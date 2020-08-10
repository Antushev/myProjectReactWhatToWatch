import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {ActionCreator as DataActionCreator} from './../../reducer/data/data.js';
import {getFilmById} from './../../reducer/data/selectors.js';

import {formatVideoElapsed} from '../../utils/common.js';
import {AppRoute, TypeScreen} from '../../utils/const.js';
import {filmShape} from '../../utils/shapes.js';

const getPositionToggler = (progress) => {
  const progressString = `${progress}%`;

  return {
    left: progressString
  };
};

class VideoPlayerBig extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      filmActive,
      children,
      isPlaying,
      videoProgress,
      videoTimeElapsed,
      onPlayClick,
      onExitVideoPlayerClick,
      onFullScreenClick
    } = this.props;

    return (
      <div className="player">
        {children}

        <Link
          to={`${AppRoute.FILMS}/${filmActive.id}`}
          type="button"
          className="player__exit"
          onClick={() => onExitVideoPlayerClick(TypeScreen.MAIN_SCREEN)}
        >
          Exit
        </Link>

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
  }
}

VideoPlayerBig.propTypes = {
  filmActive: PropTypes.shape(filmShape).isRequired,
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

const mapStateToProps = (state, props) => {
  return {
    filmActive: getFilmById(state, Number(props.match.params.id))
  };
};

const mapDispatchToProps = (dispatch) => ({
  addFilmActive(film) {
    dispatch(DataActionCreator.addFilmActive(film));
  }
});

export {VideoPlayerBig};
export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayerBig);
