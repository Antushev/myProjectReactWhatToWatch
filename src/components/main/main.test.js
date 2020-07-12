import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const films = [
  {
    name: `Хоббит: Пустошь Смауга`,
    picture: `img/pulp-fiction.jpg`,
    genre: `Adventure`,
    date: 2014
  },
  {
    name: `Интерстеллар`,
    picture: `img/pulp-fiction.jpg`,
    genre: `Adventure`,
    date: 2014
  },
  {
    name: `Спасти рядоого Райана`,
    picture: `img/pulp-fiction.jpg`,
    genre: `Adventure`,
    date: 2014
  },
  {
    name: `Хоббит: Пустошь Смауга`,
    picture: `img/pulp-fiction.jpg`,
    genre: `Adventure`,
    date: 2014
  },
  {
    name: `Власталин колец: Возвращение короля`,
    picture: `img/pulp-fiction.jpg`,
    genre: `Adventure`,
    date: 2014
  },
  {
    name: `Хоббит: Пустошь Смауга`,
    picture: `img/pulp-fiction.jpg`,
    genre: `Adventure`,
    date: 2014
  },
  {
    name: `Хоббит: Нежданное путешествие`,
    picture: `img/pulp-fiction.jpg`,
    genre: `Adventure`,
    date: 2014
  },
  {
    name: `Хоббит: Пустошь Смауга`,
    picture: `img/pulp-fiction.jpg`,
    genre: `Adventure`,
    date: 2014
  }
];


const film = {
  name: `Интерстеллар`,
  picture: `img/picture.jpg`,
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
            handleHeaderClick={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
