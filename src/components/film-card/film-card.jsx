import React from 'react';
import PropTypes from 'prop-types';

const FilmCard = (props) => {
  const {film, handleHeaderClick, handleFilmCardMouseOver} = props;
  const {name, picture} = film;

  return (
    <article key={film} className="small-movie-card catalog__movies-card"
      onMouseOver={handleFilmCardMouseOver}
    >
      <div className="small-movie-card__image">
        <img src={picture}
          alt={film} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title" onClick={handleHeaderClick}>
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired
  }).isRequired,
  handleHeaderClick: PropTypes.func.isRequired,
  handleFilmCardMouseOver: PropTypes.func.isRequired
};

export default FilmCard;
