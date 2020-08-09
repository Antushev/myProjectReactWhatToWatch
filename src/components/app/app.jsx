import React, {PureComponent} from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import history from '../../history.js';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {AppRoute, TypeScreen, TypeVideoPlayer} from '../../utils/const.js';
import {Operation as DataOperation, ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
import {ActionCreator as AppStateActionCreator} from '../../reducer/app-state/app-state.js';
import {
  getLoadingStatus,
  getErrorStatus, getFilmPromo,
  getComments,
  getFilmsByGenre
} from './../../reducer/data/selectors.js';
import {getAuthorizeStatusUser, getUserInfo} from './../../reducer/user/selectors.js';
import {getTypeScreenActive, getShowFilmCardCount} from './../../reducer/app-state/selectors.js';

import {filmShape, userShape, commentShape} from '../../utils/shapes.js';

import Main from '../main/main.jsx';
import FilmDetails from '../film-details/film-details.jsx';
import VideoPlayerBig from '../video-player-big/video-player-big.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import AddReview from '../add-review/add-review.jsx';
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
      film: {},
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

    return <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          {this._renderApp()}
        </Route>
        <Route exct path={AppRoute.LOGIN}>
          <SignInWrapped />
        </Route>
      </Switch>
    </Router>;
  }

  _renderApp() {
    const {
      films,
      filmPromo,
      user,
      comments,
      typeScreenActive,
      showFilmCardCount,
      authorizationStatus,
      onGenreTabClick,
      onShowMoreClick,
      onTypeScreenChange,
      onFilmMyListClick
    } = this.props;
    const {film} = this.state;

    switch (typeScreenActive) {
      case TypeScreen.MAIN_SCREEN:
        return (
          <Main
            films={films}
            user={user}
            showFilmCardCount={showFilmCardCount}
            filmCardPreview={filmPromo}
            authorizationStatus={authorizationStatus}
            onFilmClick={this._handleFilmClick}
            onPlayClick={this._handlePlayClick}
            onTypeScreenChange={onTypeScreenChange}
            onGenreTabClick={onGenreTabClick}
            onShowMoreClick={onShowMoreClick}
            onFilmMyListClick={onFilmMyListClick}
          />
        );
      case TypeScreen.DETAIL_SCREEN:
        return (
          <FilmDetailsWithTabs
            films={films}
            filmDetail={film}
            user={user}
            comments={comments}
            authorizationStatus={authorizationStatus}
            onTypeScreenChange={onTypeScreenChange}
            onFilmClick={this._handleFilmClick}
            onPlayClick={this._handlePlayClick}
            onFilmMyListClick={onFilmMyListClick}
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
      case TypeScreen.ADD_REVIEW:
        return (
          <AddReview
            film={filmPromo}
            user={user}
            authorizationStatus={authorizationStatus}
            onTypeScreenChange={onTypeScreenChange}
          />
        );
      default:
        return (
          <Main
            films={films}
            user={user}
            showFilmCardCount={showFilmCardCount}
            filmCardPreview={filmPromo}
            authorizationStatus={authorizationStatus}
            onFilmClick={this._handleFilmClick}
            onPlayClick={this._handlePlayClick}
            onTypeScreenChange={onTypeScreenChange}
            onGenreTabClick={onGenreTabClick}
            onShowMoreClick={onShowMoreClick}
            onFilmMyListClick={onFilmMyListClick}
          />
        );
    }
  }

  _handleFilmClick(film, typeScreen, idTimer = null) {
    const {onTypeScreenChange, onLoadComments} = this.props;


    // Нужно брать фильм из хранилища по ID
    onLoadComments(film.id);

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
  filmPromo: PropTypes.shape(filmShape),
  user: PropTypes.shape(userShape).isRequired,
  comments: PropTypes.arrayOf(
      PropTypes.shape(commentShape)
  ),
  typeScreenActive: PropTypes.string.isRequired,
  showFilmCardCount: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onGenreTabClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onTypeScreenChange: PropTypes.func.isRequired,
  onLoadComments: PropTypes.func.isRequired,
  onFilmMyListClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    isLoading: getLoadingStatus(state),
    isError: getErrorStatus(state),
    films: getFilmsByGenre(state),
    filmPromo: getFilmPromo(state),
    showFilmCardCount: getShowFilmCardCount(state),
    authorizationStatus: getAuthorizeStatusUser(state),
    user: getUserInfo(state),
    comments: getComments(state),
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
  },

  onLoadComments(idFilm) {
    dispatch(DataOperation.loadComment(idFilm));
  },

  onFilmMyListClick(idFilm, status) {
    dispatch(DataOperation.addFilmInMyList(idFilm, status));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
