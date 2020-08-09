import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../api.js';
import {reducer, ActionCreator, Operation} from './data.js';

import {films} from './../../mocks-test/films-test.js';

const state = {
  isLoading: true,
  isError: false,
  films
};

const api = createApi(() => {});

const getFilms = (movies, genre) => {
  return movies.filter((movie) => {
    return movie.genre === genre;
  });
};

describe(`Tests reducer`, () => {
  it(`Get default films`, () => {
    expect(reducer(state, ActionCreator.getFilms())).toEqual(state);
  });

  it(`Get films with new genre`, () => {
    const newGenre = `Comedy`;

    const filmsByGenre = getFilms(state.films, newGenre);
    const newStateFilmsByGenre = Object.assign({}, state, {
      films: filmsByGenre
    });

    expect(reducer(state, ActionCreator.getFilms(newGenre))).toEqual(newStateFilmsByGenre);
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /questions`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [films]);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
      });
  });
});
