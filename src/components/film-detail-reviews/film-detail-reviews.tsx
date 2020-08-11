import * as React from 'react';
import * as moment from 'moment';

import {Film, Comment} from '../../utils/types';

interface Props {
  film: Film,
  comments: Comment[],
  renderTabs: () => React.ReactNode
};

const renderComment = (comment) => {
  const {comment: commentUser, date, id, rating, user} = comment;
  const {name} = user;

  return <div key={id} className="review">
    <blockquote className="review__quote">
      <p className="review__text">{commentUser}</p>

      <footer className="review__details">
        <cite className="review__author">{name}</cite>
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

const FilmDetailReviews: React.FunctionComponent<Props> = (props: Props) => {
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

export default FilmDetailReviews;
