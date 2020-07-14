import React from 'react';
import ReactDOM from 'react-dom';

import {generateFilms} from './mocks/films.js';

import App from './components/app/app.jsx';

const FILMS_NUMBER = 10;

const films = generateFilms(FILMS_NUMBER);

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
