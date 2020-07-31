import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilmsList from './films-list.jsx';

import {films} from '../../mocks-test/films-test.js';
import {FilmsListType} from '../../mocks-test/films-test.js';

configure({adapter: new Adapter()});

describe(`FilmsListComponentE2E`, () => {
  it(`Click header films`, () => {
    const handleFilmClick = jest.fn();

    const filmsList = shallow(
        <FilmsList
          films={films}
          showFilmCardCount={8}
          filmListType={FilmsListType.DEFAULT}
          handleFilmClick={handleFilmClick}
        />
    );

    const buttonHeaders = filmsList.find(`.small-movie-card__title`);

    buttonHeaders.forEach((buttonHeader) => {
      buttonHeader.simulate(`click`);
    });

    expect(handleFilmClick).toBeCalledTimes(buttonHeaders.length);
  });

  it(`Click header films`, () => {
    const handleFilmClick = jest.fn();

    const filmsList = shallow(
        <FilmsList
          films={films}
          showFilmCardCount={16}
          filmListType={FilmsListType.DEFAULT}
          handleFilmClick={handleFilmClick}
        />
    );

    const buttonHeaders = filmsList.find(`.small-movie-card__title`);

    buttonHeaders.forEach((buttonHeader) => {
      buttonHeader.simulate(`click`);
    });

    expect(handleFilmClick).toBeCalledTimes(buttonHeaders.length);
  });

  it(`Click header films`, () => {
    const handleFilmClick = jest.fn();

    const filmsList = shallow(
        <FilmsList
          films={films}
          showFilmCardCount={0}
          filmListType={FilmsListType.DEFAULT}
          handleFilmClick={handleFilmClick}
        />
    );

    const buttonHeaders = filmsList.find(`.small-movie-card__title`);

    buttonHeaders.forEach((buttonHeader) => {
      buttonHeader.simulate(`click`);
    });

    expect(handleFilmClick).toBeCalledTimes(buttonHeaders.length);
  });
});
