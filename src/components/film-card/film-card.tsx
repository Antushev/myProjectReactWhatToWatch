import * as React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {AppRoute} from '../../utils/const.js';
import {filmShape} from '../../utils/shapes.js';

const FilmCard = (props) => {
  const {film, renderVideoPlayer} = props;
  const {id, name, posterImage, previewVideo, videoMain} = film;

  return (
    <article
      key={id}
      className="small-movie-card catalog__movies-card"
    >
      <Link to={`${AppRoute.FILMS}/${id}`}>
        {renderVideoPlayer(posterImage, previewVideo, videoMain)}
      </Link>
      <h3 className="small-movie-card__title">
        <Link to={`${AppRoute.FILMS}/${id}`} className="small-movie-card__link">{name}</Link>
      </h3>
    </article>
  );
};


FilmCard.propTypes = {
  film: PropTypes.shape(filmShape).isRequired,
  renderVideoPlayer: PropTypes.func.isRequired,
};

export default FilmCard;
