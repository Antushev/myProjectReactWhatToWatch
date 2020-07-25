import React from 'react';
import PropTypes from 'prop-types';

import {filmShape} from './../../utils/shapes.js';

const FilmDetailMore = (props) => {
  const {film, renderTabs} = props;
  const {
    date,
    director,
    genre,
    name,
    posterImage,
    starring,
    runtime
  } = film;

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <div className="movie-card__poster movie-card__poster--big">
          <img src={`img/${posterImage}`} alt={name} width="218"
            height="327"/>
        </div>

        <div className="movie-card__desc">
          {renderTabs()}

          <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Director</strong>
                <span className="movie-card__details-value">{director}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Starring</strong>
                <span className="movie-card__details-value">
                  {starring}
                </span>
              </p>
            </div>

            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">{runtime}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">{genre}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">{date}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FilmDetailMore.propTypes = {
  film: PropTypes.shape(filmShape).isRequired,
  renderTabs: PropTypes.func.isRequired
};

export default FilmDetailMore;
