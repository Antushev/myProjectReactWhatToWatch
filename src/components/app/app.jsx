import React from 'react';
import PropTypes from 'prop-types';
import {filmShape} from '../../utils/shapes.js';

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
      PropTypes.shape(filmShape)
  ),
  filmName: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired
};

export default App;
