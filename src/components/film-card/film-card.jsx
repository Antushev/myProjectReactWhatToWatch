import React from 'react';
import PropTypes from 'prop-types';
import {filmShape} from '../../utils/shapes.js';

const FilmCard = (props) => {
  const {film, renderVideoPlayer, handleFilmClick, handleFilmCardMouseOver} = props;
  const {id, name, posterImage, previewVideo} = film;

  return (
    <article
      key={id}
      className="small-movie-card catalog__movies-card"
      onMouseOver={() => handleFilmCardMouseOver(film)}
      onClick={() => handleFilmClick(film)}
    >
      {renderVideoPlayer(posterImage, previewVideo)}
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
};


FilmCard.propTypes = {
  film: PropTypes.shape(filmShape).isRequired,
  renderVideoPlayer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]).isRequired,
  handleFilmClick: PropTypes.func.isRequired,
  handleFilmCardMouseOver: PropTypes.func.isRequired,
};

export default FilmCard;
