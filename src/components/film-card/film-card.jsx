import React from 'react';
import PropTypes from 'prop-types';
import {filmShape} from '../../utils/shapes.js';

const FilmCard = (props) => {
  const {film, handleHeaderClick, handleFilmCardMouseOver} = props;
  const {id, name, picture} = film;

  return (
    <article key={id} className="small-movie-card catalog__movies-card"
      onMouseOver={() => handleFilmCardMouseOver(id)}
    >
      <div className="small-movie-card__image">
        <img src={picture}
          alt={name} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title" onClick={handleHeaderClick}>
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape(filmShape).isRequired,
  handleHeaderClick: PropTypes.func.isRequired,
  handleFilmCardMouseOver: PropTypes.func.isRequired
};

export default FilmCard;
