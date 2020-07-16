import React from 'react';
import PropTypes from 'prop-types';
import {filmShape} from '../../utils/shapes.js';

const FilmCard = (props) => {
  const {film, handleFilmClick, handleFilmCardMouseOver} = props;
  const {id, name, posterImage} = film;

  return (
    <article key={id} className="small-movie-card catalog__movies-card"
      onMouseOver={() => handleFilmCardMouseOver(film)}
    >
      <div className="small-movie-card__image" onClick={() => handleFilmClick(film)}>
        <img
          src={`img/${posterImage}`}
          alt={name}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-movie-card__title" onClick={() => handleFilmClick(film)}>
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape(filmShape).isRequired,
  handleFilmClick: PropTypes.func.isRequired,
  handleFilmCardMouseOver: PropTypes.func.isRequired
};

export default FilmCard;
