import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilmsList from './films-list.jsx';

configure({adapter: new Adapter()});

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
  it(`Click header films`, () => {
    const handleHeaderClick = jest.fn();

    const filmsList = shallow(
        <FilmsList
          films={films}
          handleHeaderClick={handleHeaderClick}
        />
    );

    const buttonHeaders = filmsList.find(`.small-movie-card__title`);

    buttonHeaders.forEach((buttonHeader) => {
      buttonHeader.simulate(`click`);
    });

    expect(handleHeaderClick).toBeCalledTimes(buttonHeaders.length);
  });
});
