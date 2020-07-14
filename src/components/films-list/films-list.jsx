import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {filmShape} from '../../utils/shapes.js';

import FilmCard from '../film-card/film-card.jsx';

export default class FilmsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCardId: null
    };

    this._handleFilmCardMouseOver = this._handleFilmCardMouseOver.bind(this);
  }

  render() {
    const {films, handleHeaderClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {this._renderFilmsCard(films, handleHeaderClick)}
      </div>
    );
  }

  _renderFilmsCard(films, handleHeaderClick) {
    return films.map((film) => {
      return <FilmCard
        key={film.id}
        film={film}
        handleHeaderClick={handleHeaderClick}
        handleFilmCardMouseOver={this._handleFilmCardMouseOver}
      />;
    });
  }

  _handleFilmCardMouseOver(idFilm) {
    this.setState({
      activeCardId: idFilm
    });
  }
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape(filmShape).isRequired
  ).isRequired,
  handleHeaderClick: PropTypes.func.isRequired,
};
