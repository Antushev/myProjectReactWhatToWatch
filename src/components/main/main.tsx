import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {AppRoute, AuthorizationStatus, TypeScreen, FilmsListType} from '../../utils/const';
import {Film, UserMaximum} from '../../utils/types';

import FilmsList from '../films-list/films-list';
import GenresList from '../genres-list/genres-list';
import ShowMore from '../show-more/show-more';
import UserProfile from '../user-profile/user-profile';

import {getFilmsByGenre} from './../../reducer/data/selectors';

import {withActiveItem} from '../../hocs/with-active-item/with-active-item';
import history from "../../history";

interface Props {
  films: Film[],
  user: UserMaximum,
  showFilmCardCount: number,
  filmCardPreview: Film,
  authorizationStatus: string,
  // onFilmClick: func,
  onGenreTabClick: (genre: string) => void,
  onShowMoreClick: () => void,
  // onPlayClick: func,
  // onTypeScreenChange: func,
  onFilmMyListClick: (id: number, isFavorite: boolean) => void
}

const GenresListWrapped = withActiveItem(GenresList);

const DEFAULT_GENRE = `All genres`;

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {
    films,
    user,
    showFilmCardCount,
    filmCardPreview,
    authorizationStatus,
    // onFilmClick,
    onGenreTabClick,
    onShowMoreClick,
    // onPlayClick,
    onFilmMyListClick
  } = props;

  const {
    id,
    name,
    backgroundImage,
    posterImage,
    genre,
    date,
    isFavorite
  } = filmCardPreview;

  return <React.Fragment>
    <section className="movie-card">
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
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={posterImage} alt={name} width="218"
              height="327"/>
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{date}</span>
            </p>

            <div className="movie-card__buttons">
              <Link
                to={`${AppRoute.PLAYER}/${id}`}
                className="btn btn--play movie-card__button"
                type="button"
                // onClick={() => onPlayClick(filmCardPreview, TypeScreen.VIDEO_BIG_SCREEN)}
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
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenresListWrapped
          activeItem={DEFAULT_GENRE}
          onGenreTabClick={onGenreTabClick}
        />

        <FilmsList
          films={films}
          showFilmCardCount={showFilmCardCount}
          filmListType={FilmsListType.DEFAULT}
         // onFilmClick={onFilmClick}
         currentFilm={films[0]}
        />

        {renderShowMore(films, showFilmCardCount, onShowMoreClick)}

      </section>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
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
  </React.Fragment>;
};

const renderShowMore = (films, showFilmCardCount, onShowMoreClick) => {
  if (films.length > showFilmCardCount) {
    return <ShowMore
      onShowMoreClick={onShowMoreClick}
    />;
  }

  return null;
};

const mapStateToProps = (state) => {
  return {
    films: getFilmsByGenre(state)
  };
};

export {Main};
export default connect(mapStateToProps, null)(Main);
