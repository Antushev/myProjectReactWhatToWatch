import React, {PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {FILM_CARD_DEFAULT, TypeScreen, TypeVideoPlayer} from '../../utils/const.js';
import {ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
import {ActionCreator as AppStateActionCreator} from '../../reducer/app-state/app-state.js';
import {getLoadingStatus, getErrorStatus, getFilmsByGenre} from './../../reducer/data/selectors.js';
import {getAuthorizeStatusUser, getUserInfo} from './../../reducer/user/selectors.js';
import {getTypeScreenActive, getShowFilmCardCount} from './../../reducer/app-state/selectors.js';

import {filmShape, userShape} from '../../utils/shapes.js';

import Main from '../main/main.jsx';
import FilmDetails from '../film-details/film-details.jsx';
import VideoPlayerBig from '../video-player-big/video-player-big.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import Loading from '../loading/loading.jsx';
import Error from '../error/error.jsx';

import {withTabs} from '../../hocs/with-tabs/with-tabs.jsx';
import {withVideo} from '../../hocs/with-video/with-video.jsx';
import {withVideoPlayerBig} from '../../hocs/with-video-player-big/with-video-player-big.jsx';
import {withFormValidation} from '../../hocs/with-form-validation/with-form-validation.jsx';

const FilmDetailsWithTabs = withTabs(FilmDetails);
const VideoPlayerBigWithControls = withVideo(VideoPlayerBig, TypeVideoPlayer.BIG_VIDEO_PLAYER);
const VideoPlayerBigWrapped = withVideoPlayerBig(VideoPlayerBigWithControls);
const SignInWrapped = withFormValidation(SignIn);

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
            onExitVideoPlayerClick={this._handleExitVideoPlayerClick}
          />
        </Route>
        <Route exct path='/dev-film-detail'>
          <FilmDetailsWithTabs
            films={films}
            film={filmCard}
            onFilmClick={this._handleFilmClick}
          />
        </Route>
        <Route exct path='/dev-sign-in'>
          <SignInWrapped />
        </Route>
      </Switch>
    </BrowserRouter>;
  }

  _renderApp() {
    const {
      films,
      user,
      typeScreenActive,
      showFilmCardCount,
      authorizationStatus,
      onGenreTabClick,
      onShowMoreClick,
      onTypeScreenChange
    } = this.props;
    const {film} = this.state;

    const filmCard = films[0];

    switch (typeScreenActive) {
      case TypeScreen.MAIN_SCREEN:
        return (
          <Main
            films={films}
            user={user}
            currentFilms={films}
            showFilmCardCount={showFilmCardCount}
            filmCardPreview={filmCard}
            authorizationStatus={authorizationStatus}
            onFilmClick={this._handleFilmClick}
            onPlayClick={this._handlePlayClick}
            onTypeScreenChange={onTypeScreenChange}
            onGenreTabClick={onGenreTabClick}
            onShowMoreClick={onShowMoreClick}
          />
        );
      case TypeScreen.DETAIL_SCREEN:
        return (
          <FilmDetailsWithTabs
            films={films}
            film={film}
            user={user}
            authorizationStatus={authorizationStatus}
            onTypeScreenChange={onTypeScreenChange}
            onFilmClick={this._handleFilmClick}
            onPlayClick={this._handlePlayClick}
          />
        );
      case TypeScreen.VIDEO_BIG_SCREEN:
        const {posterImage, videoMain} = film;

        return (
          <VideoPlayerBigWrapped
            posterImage={posterImage}
            videoMain={videoMain}
            onExitVideoPlayerClick={this._handleExitVideoPlayerClick}
          />
        );
      case TypeScreen.SIGN_IN:
        return (
          <SignInWrapped />
        );
      default:
        return (
          <Main
            films={films}
            user={user}
            currentFilms={films}
            showFilmCardCount={showFilmCardCount}
            filmCardPreview={filmCard}
            authorizationStatus={authorizationStatus}
            onFilmClick={this._handleFilmClick}
            onPlayClick={this._handlePlayClick}
            onTypeScreenChange={onTypeScreenChange}
            onGenreTabClick={onGenreTabClick}
            onShowMoreClick={onShowMoreClick}
          />
        );
    }
  }

  _handleFilmClick(film, typeScreen, idTimer = null) {
    const {onTypeScreenChange} = this.props;

    if (idTimer) {
      clearTimeout(idTimer);
    }

    onTypeScreenChange(typeScreen);

    this.setState({
      film,
    });
  }

  _handlePlayClick(film, typeScreen) {
    const {onTypeScreenChange} = this.props;

    onTypeScreenChange(typeScreen);

    this.setState({
      film
    });
  }

  _handleExitVideoPlayerClick(typeScreen) {
    const {onTypeScreenChange} = this.props;

    onTypeScreenChange(typeScreen);

    this.setState({
      film: null
    });
  }
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape(filmShape)
  ),
  user: PropTypes.shape(userShape).isRequired,
  typeScreenActive: PropTypes.string.isRequired,
  showFilmCardCount: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onGenreTabClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onTypeScreenChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    isLoading: getLoadingStatus(state),
    isError: getErrorStatus(state),
    films: getFilmsByGenre(state),
    showFilmCardCount: getShowFilmCardCount(state),
    authorizationStatus: getAuthorizeStatusUser(state),
    user: getUserInfo(state),
    typeScreenActive: getTypeScreenActive(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGenreTabClick(genre) {
    dispatch(DataActionCreator.changeGenre(genre));
    dispatch(AppStateActionCreator.resetFilmCardCount());
  },

  onTypeScreenChange(typeScreen) {
    dispatch(AppStateActionCreator.changeTypeScreen(typeScreen));
  },

  onShowMoreClick() {
    dispatch(AppStateActionCreator.showAdditionalCard());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
