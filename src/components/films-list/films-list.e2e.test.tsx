import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import FilmsList from './films-list';

import {film, films} from '../../mocks-test/films-t';
import {FilmsListType} from '../../mocks-test/films-t';

import {Film} from '../../utils/types';

const filmTest: Film = film;
const filmsTest: Film[] = films;

configure({adapter: new Adapter()});

describe(`FilmsListComponentE2E`, () => {
  it(`Click header films`, () => {
    const onFilmClick = jest.fn();

    const filmsList = shallow(
        <FilmsList
          films={filmsTest}
          showFilmCardCount={8}
          filmListType={FilmsListType.DEFAULT}
         currentFilm={filmTest}
        />
    );

    const buttonHeaders = filmsList.find(`.small-movie-card__title`);

    buttonHeaders.forEach((buttonHeader) => {
      buttonHeader.simulate(`click`);
    });

    expect(onFilmClick).toBeCalledTimes(buttonHeaders.length);
  });

  it(`Click header films`, () => {
    const onFilmClick = jest.fn();

    const filmsList = shallow(
        <FilmsList
          films={filmsTest}
          showFilmCardCount={16}
          filmListType={FilmsListType.DEFAULT}
          currentFilm={filmTest}
        />
    );

    const buttonHeaders = filmsList.find(`.small-movie-card__title`);

    buttonHeaders.forEach((buttonHeader) => {
      buttonHeader.simulate(`click`);
    });

    expect(onFilmClick).toBeCalledTimes(buttonHeaders.length);
  });

  it(`Click header films`, () => {
    const onFilmClick = jest.fn();

    const filmsList = shallow(
        <FilmsList
          films={filmsTest}
          showFilmCardCount={0}
          filmListType={FilmsListType.DEFAULT}
          currentFilm={filmTest}
        />
    );

    const buttonHeaders = filmsList.find(`.small-movie-card__title`);

    buttonHeaders.forEach((buttonHeader) => {
      buttonHeader.simulate(`click`);
    });

    expect(onFilmClick).toBeCalledTimes(buttonHeaders.length);
  });
});
