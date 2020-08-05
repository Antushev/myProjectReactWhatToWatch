import React from 'react';
import PropTypes from 'prop-types';

import {FilmsListType} from '../../utils/const.js';
import {filmShape, userShape} from '../../utils/shapes.js';

import FilmsList from './../films-list/films-list.jsx';
import GenresList from './../genres-list/genres-list.jsx';
import ShowMore from './../show-more/show-more.jsx';
import UserProfile from './../user-profile/user-profile.jsx';

import {withActiveItem} from './../../hocs/with-active-item/with-active-item.jsx';

const GenresListWrapped = withActiveItem(GenresList);

const DEFAULT_GENRE = `All genres`;

const Main = (props) => {
  const {
    films,
    user,
    showFilmCardCount,
    filmCardPreview,
    authorizeStatus,
    handleFilmClick,
    handleGenreTabClick,
    handleShowMoreClick,
    handlePlayClick,
    handleSignInClick,
  } = props;

  const {
    name,
    backgroundImage,
    posterImage,
    genre,
    date
  } = filmCardPreview;

  return <React.Fragment>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={backgroundImage} alt={name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <UserProfile
          user={user}
          authorizeStatus={authorizeStatus}
          handleSignInClick={handleSignInClick}
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
              <button
                className="btn btn--play movie-card__button"
                type="button"
                onClick={() => handlePlayClick(filmCardPreview)}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
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
          films={films}
          activeItem={DEFAULT_GENRE}
          handleGenreTabClick={handleGenreTabClick}
        />

        <FilmsList
          films={films}
          showFilmCardCount={showFilmCardCount}
          filmListType={FilmsListType.DEFAULT}
          handleFilmClick={handleFilmClick}
        />

        {renderShowMore(films, showFilmCardCount, handleShowMoreClick)}

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

const renderShowMore = (films, showFilmCardCount, handleShowMoreClick) => {
  if (films.length > showFilmCardCount) {
    return <ShowMore
      handleShowMoreClick={handleShowMoreClick}
    />;
  }

  return null;
};

Main.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape(filmShape)
  ).isRequired,
  user: PropTypes.shape(userShape).isRequired,
  showFilmCardCount: PropTypes.number.isRequired,
  filmCardPreview: PropTypes.shape(filmShape).isRequired,
  authorizeStatus: PropTypes.string.isRequired,
  handleFilmClick: PropTypes.func.isRequired,
  handleGenreTabClick: PropTypes.func.isRequired,
  handleShowMoreClick: PropTypes.func.isRequired,
  handlePlayClick: PropTypes.func.isRequired,
  handleSignInClick: PropTypes.func.isRequired
};

export default Main;
