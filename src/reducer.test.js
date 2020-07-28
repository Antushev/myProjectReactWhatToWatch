import {reducer, ActionCreator} from './reducer.js';
import {films, currentGenre} from './mocks-test/films-test.js';

const state = {
  films,
  currentFilms: films,
  currentGenre
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

  it(`Change genre`, () => {
    const newGenre = `Comedy`;

    expect(reducer(state, ActionCreator.changeGenre(newGenre))).toEqual(
        Object.assign({}, state, {
          currentGenre: newGenre
        })
    );
  });

  it(`Get films with new genre`, () => {
    const newGenre = `Comedy`;
    const newGenreInState = Object.assign({}, state, {
      currentGenre: newGenre
    });
    const newFilms = getFilms(films, newGenre);
    const newFilmsInState = Object.assign({}, newGenreInState, {
      currentFilms: newFilms
    });

    expect(reducer(newGenreInState, ActionCreator.getFilms())).toEqual(newFilmsInState);
  });
});
