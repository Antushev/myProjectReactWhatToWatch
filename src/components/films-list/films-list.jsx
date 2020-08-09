import React from 'react';
import PropTypes from 'prop-types';
import {FilmsListType, TypeVideoPlayer} from '../../utils/const.js';
import {filmShape} from '../../utils/shapes.js';

import {withVideoPlayer} from '../../hocs/with-video-player/with-video-player.jsx';

import FilmCard from '../film-card/film-card.jsx';

const FILMS_MORE_LIKE_COUNT = 4;

const FilmCardWithVideoPlayer = withVideoPlayer(FilmCard, TypeVideoPlayer.SMALL_VIDEO_PLAYER);

const getFilmsMoreLike = (currentFilm, films) => {
  return films.filter((film) => {
    return film.genre === currentFilm.genre && film.name !== currentFilm.name;
  }).slice(0, FILMS_MORE_LIKE_COUNT);
};

const FilmsList = (props) => {
  const renderFilmsList = () => {
    const {
      currentFilm,
      films,
      filmListType,
      onFilmClick,
      showFilmCardCount
    } = props;

    switch (filmListType) {
      case FilmsListType.DEFAULT:
        return renderFilmsCardDefault(films, showFilmCardCount, onFilmClick);
      case FilmsListType.MORE_LIKE:
        return renderFilmsCardMoreLike(currentFilm, films, onFilmClick);
      default:
        return renderFilmsCardDefault(films, onFilmClick);
    }
  };

  const renderFilmsCardDefault = (films, showFilmCardCount, onFilmClick) => {
    return films.map((film) => {
      return <FilmCardWithVideoPlayer
        key={film.id}
        film={film}
        onFilmClick={onFilmClick}
      />;
    }).slice(0, showFilmCardCount);
  };

  const renderFilmsCardMoreLike = (currentFilm, films, onFilmClick) => {
    const filmsMoreLike = getFilmsMoreLike(currentFilm, films);

    return filmsMoreLike.map((film) => {
      return <FilmCardWithVideoPlayer
        key={film.id}
        film={film}
        onFilmClick={onFilmClick}
      />;
    });
  };

  return (
    <div className="catalog__movies-list">
      {renderFilmsList()}
    </div>
  );
};

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape(filmShape).isRequired
  ).isRequired,
  showFilmCardCount: PropTypes.number,
  filmListType: PropTypes.string.isRequired,
  currentFilm: PropTypes.shape(filmShape),
  onFilmClick: PropTypes.func.isRequired
};

export default FilmsList;
