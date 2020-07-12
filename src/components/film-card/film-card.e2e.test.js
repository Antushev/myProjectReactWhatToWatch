import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmCard from './film-card.jsx';

configure({adapter: new Adapter()});

const film = {
  name: `Хоббит: Пустошь Смауга`,
  picture: `img/pulp-fiction.jpg`,
  genre: `Adventure`,
  date: 2014
};

describe(`FilmCardComponent`, () => {
  it(`Correct information about film mouseover`, () => {
    const handleFilmCardMouseOver = jest.fn();

    const filmCardMock = shallow(
        <FilmCard
          film={film}
          handleHeaderClick={() => {}}
          handleFilmCardMouseOver={handleFilmCardMouseOver}
        />
    );

    const filmCard = filmCardMock.find(`.small-movie-card`);

    filmCard.simulate(`mouseover`, film);

    expect(handleFilmCardMouseOver.mock.calls[0][0]).toMatchObject(film);
  });
});
