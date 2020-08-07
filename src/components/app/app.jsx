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
import {withFormValidation} from '../../hocs/with-form-validation/with-form-validation.js';

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
        <Route exct path='/dev-sign-in'>
          <SignIn />
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
      handleGenreTabClick,
      handleShowMoreClick,
      handleTypeScreenChange
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
            handleFilmClick={this._handleFilmClick}
            handlePlayClick={this._handlePlayClick}
            handleTypeScreenChange={handleTypeScreenChange}
            handleGenreTabClick={handleGenreTabClick}
            handleShowMoreClick={handleShowMoreClick}
          />
        );
      case TypeScreen.DETAIL_SCREEN:
        return (
          <FilmDetailsWithTabs
            films={films}
            film={film}
            user={user}
            authorizationStatus={authorizationStatus}
            handleTypeScreenChange={handleTypeScreenChange}
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
            handleFilmClick={this._handleFilmClick}
            handlePlayClick={this._handlePlayClick}
            handleTypeScreenChange={handleTypeScreenChange}
            handleGenreTabClick={handleGenreTabClick}
            handleShowMoreClick={handleShowMoreClick}
          />
        );
    }
  }

  _handleFilmClick(film, typeScreen, idTimer = null) {
    const {handleTypeScreenChange} = this.props;

    if (idTimer) {
      clearTimeout(idTimer);
    }

    handleTypeScreenChange(typeScreen);

    this.setState({
      film,
    });
  }

  _handlePlayClick(film, typeScreen) {
    const {handleTypeScreenChange} = this.props;

    handleTypeScreenChange(typeScreen);

    this.setState({
      film
    });
  }

  _handleExitVideoPlayerClick(typeScreen) {
    const {handleTypeScreenChange} = this.props;

    handleTypeScreenChange(typeScreen);

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
  handleGenreTabClick: PropTypes.func.isRequired,
  handleShowMoreClick: PropTypes.func.isRequired,
  handleTypeScreenChange: PropTypes.func.isRequired
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
  handleGenreTabClick(genre) {
    dispatch(DataActionCreator.changeGenre(genre));
    dispatch(AppStateActionCreator.resetFilmCardCount());
  },

  handleTypeScreenChange(typeScreen) {
    dispatch(AppStateActionCreator.changeTypeScreen(typeScreen));
  },

  handleShowMoreClick() {
    dispatch(AppStateActionCreator.showAdditionalCard());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
