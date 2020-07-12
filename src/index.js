import React from 'react';
import ReactDOM from 'react-dom';

import {films} from './mocks/films.js';

import App from './components/app/app.jsx';

const init = () => {
  const film = films[0];

  ReactDOM.render(
      <App
        films={films}
        filmName={film.name}
        genre={film.genre}
        date={film.date}
      />,
      document.querySelector(`#root`)
  );
};

init();
