import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

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

describe(`MainComponent`, () => {
  it(`MainComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <Main
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
