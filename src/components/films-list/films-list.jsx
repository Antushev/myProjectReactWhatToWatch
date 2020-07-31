import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {filmShape} from '../../utils/shapes.js';
import {FILM_CARD_DEFAULT, FilmsListType} from '../../utils/const.js';

import FilmCard from '../film-card/film-card.jsx';

const FILMS_MORE_LIKE_COUNT = 4;

const getFilmsMoreLike = (currentFilm, films) => {
  return films.filter((film) => {
    return film.genre === currentFilm.genre && film.name !== currentFilm.name;
  }).slice(0, FILMS_MORE_LIKE_COUNT);
};

export default class FilmsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      film: FILM_CARD_DEFAULT
    };

    this._handleFilmCardMouseOver = this._handleFilmCardMouseOver.bind(this);
  }

  render() {
    return (
      <div className="catalog__movies-list">
        {this._renderFilmsList()}
      </div>
    );
  }

  _renderFilmsList() {
    const {
      currentFilm,
      films,
      filmListType,
      handleFilmClick,
      showFilmCardCount
    } = this.props;

    switch (filmListType) {
      case FilmsListType.DEFAULT:
        return this._renderFilmsCardDefault(films, showFilmCardCount, handleFilmClick);
      case FilmsListType.MORE_LIKE:
        return this._renderFilmsCardMoreLike(currentFilm, films, handleFilmClick);
      default:
        return this._renderFilmsCardDefault(films, handleFilmClick);
    }
  }

  _renderFilmsCardDefault(films, showFilmCardCount, handleFilmClick) {
    return films.map((film) => {
      return <FilmCard
        key={film.id}
        film={film}
        handleFilmClick={handleFilmClick}
        handleFilmCardMouseOver={this._handleFilmCardMouseOver}
      />;
    }).slice(0, showFilmCardCount);
  }

  _renderFilmsCardMoreLike(currentFilm, films, handleFilmClick) {
    const filmsMoreLike = getFilmsMoreLike(currentFilm, films);

    return filmsMoreLike.map((film) => {
      return <FilmCard
        key={film.id}
        film={film}
        handleFilmClick={handleFilmClick}
        handleFilmCardMouseOver={this._handleFilmCardMouseOver}
      />;
    });
  }

  _handleFilmCardMouseOver(film) {
    this.setState({
      film
    });
  }
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape(filmShape).isRequired
  ).isRequired,
  showFilmCardCount: PropTypes.number,
  filmListType: PropTypes.string.isRequired,
  currentFilm: PropTypes.shape(filmShape),
  handleFilmClick: PropTypes.func.isRequired
};
