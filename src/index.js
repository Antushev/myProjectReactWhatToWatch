import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const init = () => {
  const film = {
    name: `Интерстеллар`,
    genre: `Adventure`,
    date: 2014
  };

  ReactDOM.render(
      <App
        filmName={film.name}
        genre={film.genre}
        date={film.date}
      />,
      document.querySelector(`#root`)
  );
};

init();
