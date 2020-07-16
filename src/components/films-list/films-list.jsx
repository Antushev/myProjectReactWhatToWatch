import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {filmShape} from '../../utils/shapes.js';
import {FILM_CARD_DEFAULT} from '../../utils/const.js';

import FilmCard from '../film-card/film-card.jsx';

export default class FilmsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      film: FILM_CARD_DEFAULT
    };

    this._handleFilmCardMouseOver = this._handleFilmCardMouseOver.bind(this);
  }

  render() {
    const {films, handleFilmClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {this._renderFilmsCard(films, handleFilmClick)}
      </div>
    );
  }

  _renderFilmsCard(films, handleFilmClick) {
    return films.map((film) => (
      <FilmCard
        key={film.id}
        film={film}
        handleFilmClick={handleFilmClick}
        handleFilmCardMouseOver={this._handleFilmCardMouseOver}
      />
    ));
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
  handleFilmClick: PropTypes.func.isRequired
};
