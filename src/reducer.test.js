import {reducer, ActionCreator} from './reducer.js';
import {films, currentGenre} from './mocks-test/films-test.js';

const state = {
  films,
  currentFilms: films,
  currentGenre,
  showFilmCardCount: 8
};

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
      currentFilms: filmsByGenre
    });

    expect(reducer(state, ActionCreator.getFilms(newGenre))).toEqual(newStateFilmsByGenre);
  });

  it(`Show film cards count`, () => {
    const newStateWithShowCard = Object.assign({}, state, {
      showFilmCardCount: 10
    });

    expect(reducer(newStateWithShowCard, ActionCreator.resetFilmCardCount())).toEqual(state);
  });
});
