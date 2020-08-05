import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getFilms} from './../../reducer/data/selectors.js';
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

const renderGenre = (genre, currentGenre, handleActiveItemChange, handleGenreTabClick) => {
  return (
    <li
      key={genre}
      className={`catalog__genres-item ${genre === currentGenre ? `catalog__genres-item--active` : ``}`}
      onClick={() => {
        handleActiveItemChange(genre);
        handleGenreTabClick(genre);
      }}
    >
      <a href="#" className="catalog__genres-link">{genre}</a>
    </li>
  );
};

const renderGenres = (genres, currentGenre, handleActiveItemChange, handleGenreTabClick) => {
  return genres.map((genre) => {
    return renderGenre(genre, currentGenre, handleActiveItemChange, handleGenreTabClick);
  }).slice(0, MAX_GENRES);
};

const GenresList = (props) => {
  const {films, activeItem, handleActiveItemChange, handleGenreTabClick} = props;

  const genres = getGenresFilms(films);

  return (
    <ul className="catalog__genres-list">
      {renderGenres(genres, activeItem, handleActiveItemChange, handleGenreTabClick)}
    </ul>
  );
};

GenresList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape(filmShape)
  ).isRequired,
  activeItem: PropTypes.string.isRequired,
  handleActiveItemChange: PropTypes.func.isRequired,
  handleGenreTabClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    films: getFilms(state)
  };
};

export {GenresList};
export default connect(mapStateToProps, null)(GenresList);
