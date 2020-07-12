import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import FilmCard from '../film-card/film-card.jsx';


export default class FilmsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      picture: null,
      genre: null,
      date: null
    };
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
    return films.map((film, index) => {
      return <FilmCard
        key={film + index}
        film={film}
        handleHeaderClick={handleHeaderClick}
        handleFilmCardMouseOver={() => {
          this.setState(film);
        }}
      />;
    });
  }
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        date: PropTypes.number.isRequired
      }).isRequired
  ).isRequired,
  handleHeaderClick: PropTypes.func.isRequired,
};
