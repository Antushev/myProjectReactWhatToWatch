import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const App = (props) => {
  const {films, filmName, genre, date} = props;

  return <Main
    films={films}
    filmName={filmName}
    genre={genre}
    date={date}
  />;
};

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.string).isRequired,
  filmName: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default App;
