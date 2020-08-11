import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import history from './../../history';

import {Film, UserMaximum, Comment} from '../../utils/types';
import {TypeScreen, AuthorizationStatus, AppRoute, FilmDetailTabsName, FilmsListType} from '../../utils/const';

import {Operation as DataOperation} from './../../reducer/data/data';
import {ActionCreator as DataActionCreator} from './../../reducer/data/data';
import {getFilmById, getFilmsByGenre, getComments, getLoadingCommentStatus} from './../../reducer/data/selectors';

import FilmDetailOverview from '../film-detail-overview/film-detail-overview';
import FilmDetailMore from '../film-detail-more/film-detail-more';
import FilmDetailReviews from '../film-detail-reviews/film-detail-reviews';
import FilmsList from '../films-list/films-list';
import UserProfile from '../user-profile/user-profile';
import Loading from '../loading/loading';

interface Props {
  films: Film[],
  film: Film,
  user: UserMaximum,
  comments: Comment[],
  authorizationStatus: string,
  activeTab: string,
  isLoadingCommentStatus: boolean,
  addFilmActive: (Film) => void,
  loadComments: (idFilm: number) => void,
  renderTabs: () => React.ReactNode,
  onFilmMyListClick: (id: number, isFavorite: boolean) => void
}

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

class FilmDetails extends React.PureComponent<Props> {
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
            showFilmCardCount={8}
            // onFilmClick={onFilmClick}
          />

        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoute.MAIN} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </section>;
  }
}

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
