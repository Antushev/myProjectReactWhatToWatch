import React, {PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {FILM_CARD_DEFAULT, TypeScreen, TypeVideoPlayer} from '../../utils/const.js';
import {ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
import {ActionCreator as AppStateActionCreator} from '../../reducer/app-state/app-state.js';
import {getLoadingStatus, getErrorStatus, getFilmsByGenre} from './../../reducer/data/selectors.js';
import {getShowFilmCardCount} from './../../reducer/app-state/selectors.js';

import {filmShape} from '../../utils/shapes.js';

import Main from '../main/main.jsx';
import FilmDetails from '../film-details/film-details.jsx';
import VideoPlayerBig from '../video-player-big/video-player-big.jsx';
import Loading from '../loading/loading.jsx';
import Error from '../error/error.jsx';

import {withTabs} from '../../hocs/with-tabs/with-tabs.jsx';
import {withVideo} from '../../hocs/with-video/with-video.jsx';
import {withVideoPlayerBig} from '../../hocs/with-video-player-big/with-video-player-big.jsx';

const FilmDetailsWithTabs = withTabs(FilmDetails);
const VideoPlayerBigWithControls = withVideo(VideoPlayerBig, TypeVideoPlayer.BIG_VIDEO_PLAYER);
const VideoPlayerBigWrapped = withVideoPlayerBig(VideoPlayerBigWithControls);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      film: FILM_CARD_DEFAULT,
      typeScreen: TypeScreen.MAIN_SCREEN
    };

    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handlePlayClick = this._handlePlayClick.bind(this);
    this._handleExitVideoPlayerClick = this._handleExitVideoPlayerClick.bind(this);
  }

  render() {
    const {isLoading, isError} = this.props;

    if (isLoading) {
      return <Loading />;
    }

    if (isError) {
      return <Error />;
    }

    const {films} = this.props;
    const filmCard = films[0];
    return <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          {this._renderApp()}
        </Route>
        <Route exact path='/dev-video-player-big'>
          <VideoPlayerBigWrapped
            posterImage={filmCard.posterImage}
            videoMain={filmCard.video}
            handleExitVideoPlayerClick={this._handleExitVideoPlayerClick}
          />
        </Route>
        <Route exct path='/dev-film-detail'>
          <FilmDetailsWithTabs
            films={films}
            film={filmCard}
            handleFilmClick={this._handleFilmClick}
          />
        </Route>
      </Switch>
    </BrowserRouter>;
  }

  _renderApp() {
    const {
      films,
      showFilmCardCount,
      handleGenreTabClick,
      handleShowMoreClick
    } = this.props;
    const {film, typeScreen} = this.state;

    const filmCard = films[0];

    switch (typeScreen) {
      case TypeScreen.MAIN_SCREEN:
        return (
          <Main
            films={films}
            currentFilms={films}
            showFilmCardCount={showFilmCardCount}
            filmCardPreview={filmCard}
            handleFilmClick={this._handleFilmClick}
            handlePlayClick={this._handlePlayClick}
            handleGenreTabClick={handleGenreTabClick}
            handleShowMoreClick={handleShowMoreClick}
          />
        );
      case TypeScreen.DETAIL_SCREEN:
        return (
          <FilmDetailsWithTabs
            films={films}
            film={film}
            handleFilmClick={this._handleFilmClick}
            handlePlayClick={this._handlePlayClick}
          />
        );
      case TypeScreen.VIDEO_BIG_SCREEN:
        const {posterImage, videoMain} = film;

        return (
          <VideoPlayerBigWrapped
            posterImage={posterImage}
            videoMain={videoMain}
            handleExitVideoPlayerClick={this._handleExitVideoPlayerClick}
          />
        );
      default:
        return (
          <Main
            films={films}
            currentFilms={films}
            showFilmCardCount={showFilmCardCount}
            filmName={filmCard.name}
            genre={filmCard.genre}
            date={filmCard.date}
            handleFilmClick={this._handleFilmClick}
            handleGenreTabClick={handleGenreTabClick}
            handleShowMoreClick={handleShowMoreClick}
          />
        );
    }
  }

  _handleFilmClick(film, idTimer = null) {
    if (idTimer) {
      clearTimeout(idTimer);
    }

    this.setState({
      film,
      typeScreen: TypeScreen.DETAIL_SCREEN
    });
  }

  _handlePlayClick(film) {
    this.setState({
      film,
      typeScreen: TypeScreen.VIDEO_BIG_SCREEN
    });
  }

  _handleExitVideoPlayerClick() {
    this.setState({
      film: null,
      typeScreen: TypeScreen.MAIN_SCREEN
    });
  }
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape(filmShape)
  ),
  showFilmCardCount: PropTypes.number.isRequired,
  handleGenreTabClick: PropTypes.func.isRequired,
  handleShowMoreClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    isLoading: getLoadingStatus(state),
    isError: getErrorStatus(state),
    films: getFilmsByGenre(state),
    showFilmCardCount: getShowFilmCardCount(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleGenreTabClick(genre) {
    dispatch(DataActionCreator.changeGenre(genre));
    dispatch(AppStateActionCreator.resetFilmCardCount());
  },

  handleShowMoreClick() {
    dispatch(AppStateActionCreator.showAdditionalCard());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
