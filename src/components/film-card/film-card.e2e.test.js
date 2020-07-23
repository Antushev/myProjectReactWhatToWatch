import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {film} from '../../mocks-test/films-test.js';

import FilmCard from './film-card.jsx';

configure({adapter: new Adapter()});

describe(`FilmCardComponentE2E`, () => {
  it(`Correct information about film mouseover`, () => {
    const handleFilmCardMouseOver = jest.fn();

    const filmCardMock = mount(
        <FilmCard
          film={film}
          handleFilmClick={() => {}}
          handleFilmCardMouseOver={handleFilmCardMouseOver}
        />
    );

    const filmCard = filmCardMock.find(`.small-movie-card`);

    filmCard.simulate(`mouseover`, film);

    expect(handleFilmCardMouseOver.mock.calls[0][0]).toBe(film);
  });
});
