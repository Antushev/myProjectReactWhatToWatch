import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {Router} from 'react-router-dom';
import history from './../../history';

import {film} from '../../mocks-test/films-t';

import FilmCard from './film-card';

configure({adapter: new Adapter()});

describe(`FilmCardComponentE2E`, () => {
  it(`Correct information about film mouseover`, () => {
    const renderVideoPlayer = jest.fn();

    const filmCardMock = mount(
        <Router history={history}>
          <FilmCard
            film={film}
            renderVideoPlayer={renderVideoPlayer}
          />
        </Router>
    );

    const filmCard = filmCardMock.find(`.small-movie-card`);

    filmCard.simulate(`mouseover`);

    expect(renderVideoPlayer).toBeCalledTimes(1);
  });
});
