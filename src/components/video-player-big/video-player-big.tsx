import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {ActionCreator as DataActionCreator} from './../../reducer/data/data';
import {getFilmById} from './../../reducer/data/selectors';

import {formatVideoElapsed} from '../../utils/common';
import {AppRoute} from '../../utils/const';
import {Film} from '../../utils/types';

interface Props {
  filmActive: Film;
  children: React.ReactNode;
  isPlaying: boolean;
  posterImage: string;
  videoMain: string;
  videoProgress: number;
  videoTimeElapsed: number;
  onFullScreenClick: () => void;
}

const getPositionToggler = (progress) => {
  const progressString = `${progress}%`;

  return {
    left: progressString
  };
};

class VideoPlayerBig extends React.PureComponent<Props, {}> {
  props: Props;

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
      onFullScreenClick
    } = this.props;

    return (
      <div className="player">
        {children}

        <Link
          to={`${AppRoute.FILMS}/${filmActive.id}`}
          type="button"
          className="player__exit"
        >
          Exit
        </Link>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={videoProgress} max="100"/>
              <div className="player__toggler" style={getPositionToggler(videoProgress)}>Toggler</div>
            </div>
            <div className="player__time-value">{formatVideoElapsed(videoTimeElapsed)}</div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
            >
              {isPlaying ?
                <svg viewBox="0 0 14 21" width="19" height="19">
                  <use xlinkHref="#pause"/>
                </svg>
                :
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"/>
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
                <use xlinkHref="#full-screen"/>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

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
