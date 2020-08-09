import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {TypeScreen} from './../../utils/const.js';

import {Operation as DataOperation} from '../../reducer/data/data.js';
import {ActionCreator as AppStateActionCreator} from '../../reducer/app-state/app-state.js';
import {getLoadingCommentStatus, getErrorLoadingComment} from '../../reducer/data/selectors.js';

const COMMENT_LENGTH_MIN = 50;
const COMMENT_LENGTH_MAX = 400;
const ID_FILM_TEMPORARY = 10;
const START_RATING_REVIEW = 0;

const withFormValidationReview = (Component) => {
  class WithFormValidationReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: START_RATING_REVIEW,
        comment: null,
        isButtonBlocked: true,
      };

      this._handleChangeRating = this._handleChangeRating.bind(this);
      this._handleChangeText = this._handleChangeText.bind(this);
      this._handleSubmitClick = this._handleSubmitClick.bind(this);
    }

    render() {
      const {rating, isButtonBlocked} = this.state;
      const {isLoadingComment, isErrorLoadingComment} = this.props;

      return (
        <Component
          rating={rating}
          isLoadingComment={isLoadingComment}
          isErrorLoadingComment={isErrorLoadingComment}
          isButtonBlocked={isButtonBlocked}
          onRatingChange={this._handleChangeRating}
          onTextChange={this._handleChangeText}
          onSubmitClick={this._handleSubmitClick}
        />
      );
    }

    _handleChangeRating(evt) {
      const {comment} = this.state;
      const commentLength = comment ? comment.length : 0;
      const ratingFilmActive = Number(evt.target.value);

      if (commentLength >= COMMENT_LENGTH_MIN && commentLength < COMMENT_LENGTH_MAX) {
        this.setState({
          isButtonBlocked: false,
          rating: ratingFilmActive
        });
      } else {
        this.setState({
          rating: ratingFilmActive,
          isButtonBlocked: true
        });
      }
    }

    _handleChangeText(evt) {
      const {rating} = this.state;

      const commentText = evt.target.value;
      const commentLength = commentText.length;

      if (commentLength >= COMMENT_LENGTH_MIN && commentLength < COMMENT_LENGTH_MAX && rating !== 0) {
        this.setState({
          isButtonBlocked: false,
          comment: commentText
        });
      } else {
        this.setState({
          isButtonBlocked: true,
          comment: commentText
        });
      }
    }

    _handleSubmitClick() {
      const {isErrorLoadingComment, isLoadingComment, onTypeScreenChange, onSubmitClick} = this.props;
      const {comment: commentText, rating: ratingComment} = this.state;

      const comment = {
        comment: commentText,
        rating: ratingComment
      };

      onSubmitClick(ID_FILM_TEMPORARY, comment);

      if (!isErrorLoadingComment && !isLoadingComment) {
        onTypeScreenChange(TypeScreen.DETAIL_SCREEN);
      }
    }
  }

  WithFormValidationReview.propTypes = {
    isLoadingComment: PropTypes.bool.isRequired,
    isErrorLoadingComment: PropTypes.bool.isRequired,
    onTypeScreenChange: PropTypes.func.isRequired,
    onSubmitClick: PropTypes.func.isRequired,
  };

  return WithFormValidationReview;
};

const mapStateToProps = (state) => {
  return {
    isLoadingComment: getLoadingCommentStatus(state),
    isErrorLoadingComment: getErrorLoadingComment(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSubmitClick(idFilm, comment) {
    dispatch(DataOperation.addComment(idFilm, comment));
  },

  onTypeScreenChange() {
    dispatch(AppStateActionCreator.changeTypeScreen(TypeScreen.DETAIL_SCREEN));
  }
});

export {withFormValidationReview};
export default (Component) => connect(mapStateToProps, mapDispatchToProps)(withFormValidationReview(Component));
