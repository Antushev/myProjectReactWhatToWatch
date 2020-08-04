import React from 'react';
import PropTypes from 'prop-types';
import {getRandomNumber} from '../../utils/common.js';

import {filmShape} from '../../utils/shapes.js';
import {FilmDetailTabsName, FilmsListType} from '../../utils/const.js';
import {generateComments} from '../../adapters/comments.js';

import FilmDetailOverview from '../film-detail-overview/film-detail-overview.jsx';
import FilmDetailMore from '../film-detail-more/film-detail-more.jsx';
import FilmDetailReviews from '../film-detail-reviews/film-detail-reviews.jsx';
import FilmsList from '../films-list/films-list.jsx';

const COMMENTS_NUMBER = getRandomNumber(1, 4);
const comments = generateComments(COMMENTS_NUMBER);

const renderDetailPages = (film, activeFilmDetailPage, renderTabs) => {
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

const FilmDetails = (props) => {
  const {films, film, activeTab, renderTabs, handleFilmClick, handlePlayClick} = props;
  const {
    backgroundImage,
    name,
    genre,
    date
  } = film;

  return <section className="movie-card movie-card--full">
    <div className="movie-card__hero">
      <div className="movie-card__bg">
        <img src={backgroundImage} alt={name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a href="main.html" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </div>
        </div>
      </header>

      <div className="movie-card__wrap">
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
              onClick={() => handlePlayClick(film)}
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
            <a href="add-review.html" className="btn movie-card__button">Add review</a>
          </div>
        </div>
      </div>
    </div>
    {renderDetailPages(film, activeTab, renderTabs)}
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>
        <FilmsList
          currentFilm={film}
          films={films}
          filmListType={FilmsListType.MORE_LIKE}
          handleFilmClick={handleFilmClick}
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
};

FilmDetails.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(filmShape).isRequired),
  film: PropTypes.shape(filmShape).isRequired,
  activeTab: PropTypes.string.isRequired,
  renderTabs: PropTypes.func.isRequired,
  handleFilmClick: PropTypes.func.isRequired,
  handlePlayClick: PropTypes.func.isRequired
};

export default FilmDetails;
