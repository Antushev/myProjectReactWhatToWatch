import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {filmShape, commentShape} from '../../utils/shapes.js';

const renderComment = (comment) => {
  const {id, comment: commentUser, user, date, rating} = comment;

  return <div key={id} className="review">
    <blockquote className="review__quote">
      <p className="review__text">{commentUser}</p>

      <footer className="review__details">
        <cite className="review__author">{user}</cite>
        <time className="review__date" dateTime="{date}">{moment(date).format(`MMMM D, YYYY`)}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{rating}</div>
  </div>;
};

const renderComments = (comments) => {
  return comments.map((comment) => {
    return renderComment(comment);
  });
};

const FilmDetailReviews = (props) => {
  const {film, comments, renderTabs} = props;
  const {
    name,
    posterImage
  } = film;

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <div className="movie-card__poster movie-card__poster--big">
          <img src={posterImage} alt={name} width="218"
            height="327"/>
        </div>

        <div className="movie-card__desc">
          {renderTabs()}

          <div className="movie-card__reviews movie-card__row">
            <div className="movie-card__reviews-col">
              {renderComments(comments)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FilmDetailReviews.propTypes = {
  film: PropTypes.shape(filmShape).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  renderTabs: PropTypes.func.isRequired
};

export default FilmDetailReviews;
