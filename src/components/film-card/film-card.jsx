import React from 'react';
import PropTypes from 'prop-types';

import {TypeScreen} from '../../utils/const.js';
import {filmShape} from '../../utils/shapes.js';

const FilmCard = (props) => {
  const {film, renderVideoPlayer, onFilmClick} = props;
  const {id, name, posterImage, previewVideo, videoMain} = film;

  return (
    <article
      key={id}
      className="small-movie-card catalog__movies-card"
      onClick={() => onFilmClick(film, TypeScreen.DETAIL_SCREEN)}
    >
      {renderVideoPlayer(posterImage, previewVideo, videoMain)}
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
};


FilmCard.propTypes = {
  film: PropTypes.shape(filmShape).isRequired,
  renderVideoPlayer: PropTypes.func.isRequired,
  onFilmClick: PropTypes.func.isRequired,
};

export default FilmCard;
