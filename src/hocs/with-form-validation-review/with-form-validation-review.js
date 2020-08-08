import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Operation as DataOperation} from '../../reducer/data/data.js';
import {getLoadingCommentStatus} from '../../reducer/data/selectors.js';

const withFormValidationReview = (Component) => {
  class WithFormValidationReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 3,
        comment: null,
        isButtonBlocked: true,
      };

      this._handleChangeRating = this._handleChangeRating.bind(this);
      this._handleChangeText = this._handleChangeText.bind(this);
      this._handleSubmitClick = this._handleSubmitClick.bind(this);
    }

    render() {
      const {rating, isButtonBlocked} = this.state;
      const {isLoadingComment} = this.props;

      return (
        <Component
          rating={rating}
          isLoadingComment={isLoadingComment}
          isButtonBlocked={isButtonBlocked}
          onRatingChange={this._handleChangeRating}
          onTextChange={this._handleChangeText}
          onSubmitClick={this._handleSubmitClick}
        />
      );
    }

    _handleChangeRating(evt) {
      const ratingFilmActive = Number(evt.target.value);

      this.setState({
        rating: ratingFilmActive
      });
    }

    _handleChangeText(evt) {
      const commentText = evt.target.value;
      const commentLength = commentText.length;

      if (commentLength >= 50 && commentLength < 400) {
        this.setState({
          isButtonBlocked: false,
          comment: commentText
        });
      }
    }

    _handleSubmitClick() {
      const {onSubmitClick} = this.props;
      const {comment: commentText, rating: ratingComment} = this.state;

      const comment = {
        comment: commentText,
        rating: ratingComment
      };

      const ID_FILM_TEMPORARY = 10;

      onSubmitClick(ID_FILM_TEMPORARY, comment);
    }
  }

  WithFormValidationReview.propTypes = {
    isLoadingComment: PropTypes.bool.isRequired,
    onSubmitClick: PropTypes.func.isRequired
  };

  return WithFormValidationReview;
};

const mapStateToProps = (state) => {
  return {
    isLoadingComment: getLoadingCommentStatus(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSubmitClick(idFilm, comment) {
    dispatch(DataOperation.addComment(idFilm, comment));
  }
});

export {withFormValidationReview};
export default (Component) => connect(mapStateToProps, mapDispatchToProps)(withFormValidationReview(Component));
