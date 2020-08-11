import * as React from 'react';
import {connect} from 'react-redux';
import history from './../../history';
import {Subtract} from 'utility-types';

import {AppRoute, TypeScreen} from './../../utils/const';
import {Film} from '../../utils/types';

import {Operation as DataOperation} from '../../reducer/data/data';
import {ActionCreator as AppStateActionCreator} from '../../reducer/app-state/app-state';
import {getLoadingCommentStatus, getErrorLoadingComment} from '../../reducer/data/selectors';

interface State {
  rating: number,
  comment: string,
  isButtonBlocked: boolean
}

interface InjectingProps {
  film: Film,
  rating: number,
  isLoadingComment: boolean,
  isErrorLoadingComment: boolean,
  isButtonBlocked: boolean,
  onRatingChange: () => void,
  onTextChange: () => void,
  onSubmitClick: (idFilm: number) => void
}

const COMMENT_LENGTH_MIN = 50;
const COMMENT_LENGTH_MAX = 400;
const START_RATING_REVIEW = 0;

const withFormValidationReview = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>

  class WithFormValidationReview extends React.PureComponent<T, State> {
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
      const {film, isLoadingComment, isErrorLoadingComment} = this.props;

      return (
        <Component
          film={film}
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

    _handleSubmitClick(idFilm) {
      const {film, isErrorLoadingComment, isLoadingComment, onSubmitClick} = this.props;
      const {comment: commentText, rating: ratingComment} = this.state;

      const comment = {
        comment: commentText,
        rating: ratingComment
      };

      onSubmitClick(idFilm, comment);

      if (!isErrorLoadingComment && !isLoadingComment) {
        history.push(`${AppRoute.FILMS}/${film.id}`);
      }
    }
  }

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
