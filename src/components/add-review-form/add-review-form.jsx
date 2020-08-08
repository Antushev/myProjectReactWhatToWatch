import React from 'react';
import PropTypes from 'prop-types';

const ratingPoints = [1, 2, 3, 4, 5];

const renderRatingPoints = (points, rating, isLoadingComment, onRatingChange) => {
  return points.map((point) => {
    return (
      <React.Fragment key={point}>
        <input
          className="rating__input"
          id={`star-${point}`}
          type="radio" name="rating"
          value={`${point}`}
          onChange={onRatingChange}
          defaultChecked={rating === point}
          disabled={isLoadingComment}
        />
        <label className="rating__label" htmlFor={`star-${point}`}>Rating {point}</label>
      </React.Fragment>
    );
  });
};

const getLoadingBlock = (isLoadingComment) => {
  return isLoadingComment ? <p>Комментарий добавлен</p> : ``;
};

const FormAddReview = (props) => {
  const {
    rating,
    isLoadingComment,
    isButtonBlocked,
    onRatingChange,
    onTextChange,
    onSubmitClick
  } = props;

  return (
    <form action="#" className="add-review__form" onSubmit={(evt) => {
      evt.preventDefault();

      onSubmitClick();
    }}>
      <div className="rating">
        <div className="rating__stars">
          <input
            className="rating__input visually-hidden"
            id={`star-0`}
            type="radio" name="rating"
            value={0}
            onChange={onRatingChange}
            defaultChecked={true}
            disabled={isLoadingComment}
            hidden={true}
          />
          <label className="rating__label visually-hidden" htmlFor="star-0">Rating 0</label>
          {renderRatingPoints(ratingPoints, rating, isLoadingComment, onRatingChange)}
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text"
          placeholder="Review text" minLength="50" maxLength="400"
          onChange={onTextChange}
          disabled={isLoadingComment}
        />
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={isButtonBlocked}
            color="#F00"
          >
            Post
          </button>
        </div>
      </div>
      {getLoadingBlock(isLoadingComment)}
    </form>
  );
};

FormAddReview.propTypes = {
  rating: PropTypes.number.isRequired,
  isLoadingComment: PropTypes.bool.isRequired,
  isButtonBlocked: PropTypes.bool.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onSubmitClick: PropTypes.func.isRequired
};

export default FormAddReview;
