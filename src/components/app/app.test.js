import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

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

describe(`AppComponent`, () => {
  it(`AppComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <App
            films={films}
            filmName={film.name}
            genre={film.genre}
            date={film.date}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
