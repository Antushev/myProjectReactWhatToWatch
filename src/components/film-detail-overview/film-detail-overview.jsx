import React from 'react';
import PropTypes from 'prop-types';

import {filmShape} from '../../utils/shapes.js';

const getRatingType = (rating) => {
  const numberFloat = Number(rating);
  if (numberFloat < 3) {
    return `Bad`;
  } else if (numberFloat < 5) {
    return `Normal`;
  } else if (numberFloat < 8) {
    return `Good`;
  } else if (numberFloat < 10) {
    return `Very good`;
  } else {
    return `Awesome`;
  }
};

const FilmDetailOverview = (props) => {
  const {film, renderTabs} = props;
  const {
    posterImage,
    rating,
    scoresCount,
    description,
    director,
    starring,
  } = film;

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <div className="movie-card__poster movie-card__poster--big">
          <img src={posterImage} alt="The Grand Budapest Hotel poster" width="218"
            height="327"/>
        </div>

        <div className="movie-card__desc">
          {renderTabs()}

          <div className="movie-rating">
            <div className="movie-rating__score">{rating}</div>
            <p className="movie-rating__meta">
              <span className="movie-rating__level">{getRatingType(rating)}</span>
              <span className="movie-rating__count">{scoresCount}</span>
            </p>
          </div>

          <div className="movie-card__text">
            <p>{description}</p>
            <p className="movie-card__director"><strong>Director: {director}</strong></p>

            <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)}
                and other</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

FilmDetailOverview.propTypes = {
  film: PropTypes.shape(filmShape).isRequired,
  renderTabs: PropTypes.func.isRequired
};

export default FilmDetailOverview;
