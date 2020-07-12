import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const handleHeaderClick = (evt) => {
  return evt.target.classList.contains(`small-movie-card__title`);
};

const App = (props) => {
  const {films, filmName, genre, date} = props;

  return <Main
    films={films}
    filmName={filmName}
    genre={genre}
    date={date}
    handleHeaderClick={handleHeaderClick}
  />;
};

App.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        date: PropTypes.number.isRequired
      }).isRequired
  ).isRequired,
  filmName: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
};

export default App;
