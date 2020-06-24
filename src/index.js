import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const init = () => {
  const films = [
    `Хоббит: Пустошь Смауга`,
    `Интерстеллар`,
    `Спасти рядоого Райана`,
    `Власталин колец: Возвращение короля`,
    `Хоббит: Нежданное путешествие`
  ];

  const film = {
    name: `Интерстеллар`,
    genre: `Adventure`,
    date: 2014
  };

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
