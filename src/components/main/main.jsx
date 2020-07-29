import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {filmShape} from '../../utils/shapes.js';
import {FilmsListType} from '../../utils/const.js';

import FilmsList from './../films-list/films-list.jsx';
import GenresList from './../genres-list/genres-list.jsx';
import ShowMore from './../show-more/show-more.jsx';

const SHOW_FILM_CARD_COUNT = 8;

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showFilmCardCount: SHOW_FILM_CARD_COUNT
    };

    this._handleShowMoreClick = this._handleShowMoreClick.bind(this);
  }

  render() {
    const {showFilmCardCount} = this.state;
    const {
      films,
      currentFilms,
      currentGenre,
      filmName,
      genre,
      date,
      handleFilmClick,
      handleGenreTabClick
    } = this.props;

    return <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218"
                height="327"/>
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{filmName}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{date}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList
            films={films}
            currentGenre={currentGenre}
            handleGenreTabClick={handleGenreTabClick}
          />

          <FilmsList
            films={currentFilms}
            showFilmCardCount={showFilmCardCount}
            filmListType={FilmsListType.DEFAULT}
            handleFilmClick={handleFilmClick}
          />

          {this._renderShowMore(currentFilms)}

        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>;
  }

  _renderShowMore(currentFilms) {
    const {showFilmCardCount} = this.state;

    if (currentFilms.length > showFilmCardCount) {
      return <ShowMore
        handleShowMoreClick={this._handleShowMoreClick}
      />;
    }

    return null;
  }

  _handleShowMoreClick() {
    this.setState((prevState) => {
      return {showFilmCardCount: prevState.showFilmCardCount + SHOW_FILM_CARD_COUNT};
    });
  }
}

Main.propTypes = {
  date: PropTypes.number.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape(filmShape)
  ).isRequired,
  currentFilms: PropTypes.arrayOf(
      PropTypes.shape(filmShape)
  ).isRequired,
  currentGenre: PropTypes.string.isRequired,
  filmName: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  handleFilmClick: PropTypes.func.isRequired,
  handleGenreTabClick: PropTypes.func.isRequired
};

export default Main;
