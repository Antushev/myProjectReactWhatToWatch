import React from 'react';
import PropTypes from 'prop-types';
import {filmShape} from './../../utils/shapes.js';

const getGenresFilms = (films) => {
  let genres = [`All genres`];

  films.forEach((film) => {
    const isFilmInArray = genres.find((genre) => {
      return film.genre === genre;
    });

    if (isFilmInArray === undefined) {
      genres.push(film.genre);
    }
  });

  return genres;
};

const MAX_GENRES = 9;

const renderGenre = (genre, currentGenre, onActiveItemChange, onGenreTabClick) => {
  return (
    <li
      key={genre}
      className={`catalog__genres-item ${genre === currentGenre ? `catalog__genres-item--active` : ``}`}
      onClick={() => {
        onActiveItemChange(genre);
        onGenreTabClick(genre);
      }}
    >
      <a href="#" className="catalog__genres-link">{genre}</a>
    </li>
  );
};

const renderGenres = (genres, currentGenre, onActiveItemChange, onGenreTabClick) => {
  return genres.map((genre) => {
    return renderGenre(genre, currentGenre, onActiveItemChange, onGenreTabClick);
  }).slice(0, MAX_GENRES);
};

const GenresList = (props) => {
  const {films, activeItem, onActiveItemChange, onGenreTabClick} = props;

  const genres = getGenresFilms(films);

  return (
    <ul className="catalog__genres-list">
      {renderGenres(genres, activeItem, onActiveItemChange, onGenreTabClick)}
    </ul>
  );
};

GenresList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape(filmShape)
  ).isRequired,
  activeItem: PropTypes.string.isRequired,
  onActiveItemChange: PropTypes.func.isRequired,
  onGenreTabClick: PropTypes.func.isRequired
};

export default GenresList;

