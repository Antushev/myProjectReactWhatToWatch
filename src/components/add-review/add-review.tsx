import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoute} from './../../utils/const.js';

import {filmShape, userShape} from '../../utils/shapes';

import {getFilmById} from '../../reducer/data/selectors.js';

import UserProfile from '../user-profile/user-profile.js';
import FormAddReview from '../add-review-form/add-review-form.js';

import withFormValidationReview from '../../hocs/with-form-validation-review/with-form-validation-review.js';

const FormAddReviewWrapped = withFormValidationReview(FormAddReview);

const AddReview = (props) => {
  const {film, user, authorizationStatus, onTypeScreenChange} = props;

  const {
    name,
    backgroundImage,
    posterImage
  } = film;

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={`${AppRoute.MAIN}`} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="movie-page.html" className="breadcrumbs__link">{name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserProfile
            user={user}
            authorizationStatus={authorizationStatus}
            onTypeScreenChange={onTypeScreenChange}
          />
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImage} alt={name} width="218"
            height="327"/>
        </div>
      </div>

      <div className="add-review">
        <FormAddReviewWrapped
          film={film}
        />
      </div>
    </section>
  );
};

AddReview.propTypes = {
  film: PropTypes.shape(filmShape).isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onTypeScreenChange: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    film: getFilmById(state, props.match.params.id)
  };
};

export {AddReview};
export default connect(mapStateToProps, null)(AddReview);
