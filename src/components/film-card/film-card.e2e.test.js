import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {film} from '../../mocks-test/films-test.js';

import FilmCard from './film-card.jsx';

configure({adapter: new Adapter()});

const activeCardId = 1;

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

    filmCard.simulate(`mouseover`, activeCardId);

    expect(handleFilmCardMouseOver.mock.calls[0][0]).toBe(activeCardId);
  });
});
