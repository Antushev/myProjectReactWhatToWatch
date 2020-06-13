import React from 'react';
import Main from '../main/main.jsx';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {filmName, genre, date} = props;

  return <Main
    filmName={filmName}
    genre={genre}
    date={date}
  />;
};

export default App;
