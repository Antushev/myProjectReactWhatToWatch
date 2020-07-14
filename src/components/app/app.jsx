import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const handleHeaderClick = () => {

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
  date: PropTypes.number.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        date: PropTypes.number.isRequired
      }).isRequired
  ),
  filmName: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired
};

export default App;
