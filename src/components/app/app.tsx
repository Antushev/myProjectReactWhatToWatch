import * as React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import history from '../../history';
import {connect} from 'react-redux';
import {AppRoute, TypeVideoPlayer} from '../../utils/const';
import {Operation as DataOperation, ActionCreator as DataActionCreator} from '../../reducer/data/data';
import {ActionCreator as AppStateActionCreator} from '../../reducer/app-state/app-state';
import {
  getLoadingStatus,
  getErrorStatus, getFilmPromo,
  getComments,
  getFilmsByGenre,
  getFilmActive
} from './../../reducer/data/selectors';
import {getAuthorizeStatusUser, getUserInfo} from './../../reducer/user/selectors';
import {getTypeScreenActive, getShowFilmCardCount} from './../../reducer/app-state/selectors';

import Main from '../main/main';
import FilmDetails from '../film-details/film-details';
import VideoPlayerBig from '../video-player-big/video-player-big';
import SignIn from '../sign-in/sign-in';
import AddReview from '../add-review/add-review';
import MyList from '../my-list/my-list';
import PrivateRoute from '../private-route/private-route';
import AuthRoute from '../auth-route/auth-route';
import Loading from '../loading/loading';
import Error from '../error/error';

import {withTabs} from '../../hocs/with-tabs/with-tabs';
import withVideo from '../../hocs/with-video/with-video';
import {withVideoPlayerBig} from '../../hocs/with-video-player-big/with-video-player-big';
import {withFormValidation} from '../../hocs/with-form-validation/with-form-validation';

interface Props {
  isLoading: boolean;
  isError: boolean;
  films: Film[];
  filmPromo: Film;
  filmActive: Film;
  user: UserMaximum;
  comments: Comment[];
  typeScreenActive: string;
  showFilmCardCount: number;
  authorizationStatus: string;
  onGenreTabClick: (genre: string) => void;
  onShowMoreClick: () => void;
  onTypeScreenChange: () => void;
  onLoadComments: (idFilm: number) => void;
  onFilmMyListClick: (idFilm: number, status: boolean) => void;
}

const FilmDetailsWithTabs = withTabs(FilmDetails);
const VideoPlayerBigWithControls = withVideo(VideoPlayerBig, TypeVideoPlayer.BIG_VIDEO_PLAYER);
const VideoPlayerBigWrapped = withVideoPlayerBig(VideoPlayerBigWithControls);
const SignInWrapped = withFormValidation(SignIn);

const App: React.FunctionComponent<Props> = (props: Props) => {
  const {isLoading, isError, authorizationStatus} = props;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  const {
    films,
    filmPromo,
    filmActive,
    user,
    comments,
    showFilmCardCount,
    onGenreTabClick,
    onShowMoreClick,
    onTypeScreenChange,
    onFilmMyListClick
  } = props;

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.MAIN}
          render={() => {
            return (
              <Main
                user={user}
                showFilmCardCount={showFilmCardCount}
                filmCardPreview={filmPromo}
                authorizationStatus={authorizationStatus}
                onTypeScreenChange={onTypeScreenChange}
                onGenreTabClick={onGenreTabClick}
                onShowMoreClick={onShowMoreClick}
                onFilmMyListClick={onFilmMyListClick}
              />
            );
          }}
        />
        <Route exact path={`${AppRoute.FILMS}/:id`}
          render={(routerProps) => {
            return (
              <FilmDetailsWithTabs
                {...routerProps}
                films={films}
                user={user}
                comments={comments}
                authorizationStatus={authorizationStatus}
                onTypeScreenChange={onTypeScreenChange}
                onFilmMyListClick={onFilmMyListClick}
              />
            );
          }}
        />
        <Route exact path={`${AppRoute.PLAYER}/:id`}
          render={(routerProps) => {
            return (
              <VideoPlayerBigWrapped
                {...routerProps}
                posterImage={filmActive.posterImage}
                videoMain={filmActive.videoMain}
              />
            );
          }}
        />
        <PrivateRoute exact path={`${AppRoute.FILMS}/:id${AppRoute.REVIEW}`}
          render={(routerProps) => {
            return (
              <AddReview
                {...routerProps}
                user={user}
                authorizationStatus={authorizationStatus}
                onTypeScreenChange={onTypeScreenChange}
              />
            );
          }}
        />
        <PrivateRoute exact path={AppRoute.MY_LIST}
          render={(routerProps) => {
            return (
              <MyList
                {...routerProps}
                user={user}
                authorizationStatus={authorizationStatus}
              />
            );
          }}
        />
        <AuthRoute exact path={AppRoute.LOGIN}
          render={() => {
            return <SignInWrapped />;
          }}
        />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: getLoadingStatus(state),
    isError: getErrorStatus(state),
    films: getFilmsByGenre(state),
    filmPromo: getFilmPromo(state),
    filmActive: getFilmActive(state),
    showFilmCardCount: getShowFilmCardCount(state),
    authorizationStatus: getAuthorizeStatusUser(state),
    user: getUserInfo(state),
    comments: getComments(state),
    typeScreenActive: getTypeScreenActive(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadFilmsFavorite() {
    dispatch(DataOperation.loadFilmsFavorite());
  },

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
