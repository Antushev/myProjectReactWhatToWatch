import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {AppRoute, FilmsListType} from './../../utils/const.js';
import {filmShape, userShape} from './../../utils/shapes.js';

import {Operation as DataOperation} from './../../reducer/data/data.js';
import {getFilmsFavorite, getLoadingFilmsFavoriteStatus} from './../../reducer/data/selectors.js';

import FilmsList from './../films-list/films-list.jsx';
import UserProfile from './../user-profile/user-profile.jsx';
import Loading from './../loading/loading.jsx';

class MyList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadFilmsFavorite} = this.props;
    loadFilmsFavorite();
  }

  render() {
    const {
      isLoadingFilmsFavorite,
    } = this.props;

    if (isLoadingFilmsFavorite) {
      return <Loading />;
    }

    const {
      user,
      filmsFavorite,
      authorizationStatus
    } = this.props;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={`${AppRoute.MAIN}`} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">My list {isLoadingFilmsFavorite && `(идёт загрузка)`}</h1>

          <UserProfile
            user={user}
            authorizationStatus={authorizationStatus}
          />
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <div className="catalog__movies-list">
            {isLoadingFilmsFavorite ?
              <p>Идёт загрузка...</p>
              : <FilmsList
                films={filmsFavorite}
                filmListType={FilmsListType.DEFAULT}
              />
            }
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={`${AppRoute.MAIN}`} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

MyList.propTypes = {
  filmsFavorite: PropTypes.arrayOf(
      PropTypes.shape(filmShape).isRequired
  ),
  user: PropTypes.shape(userShape).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  isLoadingFilmsFavorite: PropTypes.bool.isRequired,
  loadFilmsFavorite: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    filmsFavorite: getFilmsFavorite(state),
    isLoadingFilmsFavorite: getLoadingFilmsFavoriteStatus(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadFilmsFavorite() {
    dispatch(DataOperation.loadFilmsFavorite());
  }
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
