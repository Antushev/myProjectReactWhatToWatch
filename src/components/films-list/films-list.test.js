import React from 'react';
import renderer from 'react-test-renderer';

import FilmsList from './films-list.jsx';

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

describe(`FilmsListComponent`, () => {
  it(`FilmcListComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <FilmsList
            films={films}
            handleHeaderClick={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
