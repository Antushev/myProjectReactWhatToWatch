import React from 'react';
import PropTypes from 'prop-types';

import {filmShape} from '../../utils/shapes.js';

const getRatingType = (rating) => {
  let ratingType;
  switch (rating) {
    case rating > 3:
      ratingType = `Normal`;
      break;
    case rating > 5:
      ratingType = `Good`;
      break;
    case rating > 8:
      ratingType = `Good`;
      break;
    case rating >= 10:
      ratingType = `Awesome`;
      break;
    default:
      ratingType = `Bad`;
  }

  return ratingType;
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
          <img src={`img/${posterImage}`} alt="The Grand Budapest Hotel poster" width="218"
            height="327"/>
        </div>

        <div className="movie-card__desc">
          {renderTabs()}

          <div className="movie-rating">
            <div className="movie-rating__score">{rating}</div>
            <p className="movie-rating__meta">
              <span className="movie-rating__level">{getRatingType()}</span>
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
