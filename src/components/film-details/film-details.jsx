import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import history from './../../history.js';

import {filmShape, userShape, commentShape} from '../../utils/shapes.js';
import {TypeScreen, AuthorizationStatus, AppRoute, FilmDetailTabsName, FilmsListType} from '../../utils/const.js';

import {Operation as DataOperation} from './../../reducer/data/data.js';
import {ActionCreator as DataActionCreator} from './../../reducer/data/data.js';
import {getFilmById, getFilmsByGenre, getComments, getLoadingCommentStatus} from './../../reducer/data/selectors.js';

import FilmDetailOverview from '../film-detail-overview/film-detail-overview.jsx';
import FilmDetailMore from '../film-detail-more/film-detail-more.jsx';
import FilmDetailReviews from '../film-detail-reviews/film-detail-reviews.jsx';
import FilmsList from '../films-list/films-list.jsx';
import UserProfile from '../user-profile/user-profile.jsx';
import Loading from '../loading/loading.jsx';

const renderDetailPages = (film, activeFilmDetailPage, renderTabs, comments) => {
  switch (activeFilmDetailPage) {
    case FilmDetailTabsName.OVERVIEW:
      return <FilmDetailOverview
        film={film}
        renderTabs={renderTabs}
      />;
    case FilmDetailTabsName.DETAILS:
      return <FilmDetailMore
        film={film}
        renderTabs={renderTabs}
      />;
    case FilmDetailTabsName.REVIEWS:
      return <FilmDetailReviews
        film={film}
        comments={comments}
        renderTabs={renderTabs}
      />;
    default:
      return <FilmDetailOverview
        film={film}
        renderTabs={renderTabs}
      />;
  }
};

class FilmDetails extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {film, loadComments} = this.props;
    if (film) {
      loadComments(film.id);
    }
  }

  componentDidUpdate() {
    const {film, addFilmActive} = this.props;

    if (film) {
      addFilmActive(film);
    }
  }

  render() {
    const {isLoadingCommentStatus} = this.props;

    if (isLoadingCommentStatus) {
      return <Loading />;
    }

    const {
      films,
      film,
      user,
      comments,
      authorizationStatus,
      activeTab,
      renderTabs,
      onFilmClick,
      onPlayClick,
      onTypeScreenChange,
      onFilmMyListClick
    } = this.props;

    const {
      id,
      backgroundColor,
      backgroundImage,
      name,
      genre,
      date,
      isFavorite
    } = film;

    const styleBackground = {
      backgroundColor
    };

    return <section className="movie-card movie-card--full" style={styleBackground}>
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <Link to={`${AppRoute.MAIN}`} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <UserProfile
            user={user}
            authorizationStatus={authorizationStatus}
            onTypeScreenChange={onTypeScreenChange}
          />
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{date}</span>
            </p>

            <div className="movie-card__buttons">
              <Link
                className="btn btn--play movie-card__button"
                type="button"
                to={`${AppRoute.PLAYER}/${id}`}
                onClick={() => onPlayClick(film, TypeScreen.VIDEO_BIG_SCREEN)}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </Link>
              <button
                className="btn btn--list movie-card__button"
                type="button"
                onClick={() => {
                  if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
                    history.push(AppRoute.LOGIN);
                  } else {
                    onFilmMyListClick(id, !isFavorite);
                  }
                }}
              >
                {isFavorite ?
                  <svg viewBox="0 0 18 14" width="18" height="14">
                    <use xlinkHref="#in-list" />
                  </svg>
                  : <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add" />
                  </svg>
                }
                <span>My list</span>
              </button>
              <Link
                to={`${AppRoute.FILMS}/${id}${AppRoute.REVIEW}`}
                href="add-review.html"
                className="btn movie-card__button"
              >
                Add review
              </Link>
            </div>
          </div>
        </div>
      </div>
      {renderDetailPages(film, activeTab, renderTabs, comments)}
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList
            currentFilm={film}
            films={films}
            filmListType={FilmsListType.MORE_LIKE}
            onFilmClick={onFilmClick}
          />

        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </section>;
  }
}

FilmDetails.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(filmShape).isRequired),
  film: PropTypes.shape(filmShape).isRequired,
  user: PropTypes.shape(userShape).isRequired,
  comments: PropTypes.arrayOf(
      PropTypes.shape(commentShape)
  ),
  authorizationStatus: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  isLoadingCommentStatus: PropTypes.bool.isRequired,
  addFilmActive: PropTypes.func.isRequired,
  loadComments: PropTypes.func.isRequired,
  renderTabs: PropTypes.func.isRequired,
  onFilmClick: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onTypeScreenChange: PropTypes.func.isRequired,
  onFilmMyListClick: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    films: getFilmsByGenre(state),
    film: getFilmById(state, props.match.params.id),
    comments: getComments(state),
    isLoadingCommentStatus: getLoadingCommentStatus(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  addFilmActive(film) {
    dispatch(DataActionCreator.addFilmActive(film));
  },

  loadComments(idFilm) {
    dispatch(DataOperation.loadComment(idFilm));
  }
});

export {FilmDetails};
export default connect(mapStateToProps, mapDispatchToProps)(FilmDetails);
