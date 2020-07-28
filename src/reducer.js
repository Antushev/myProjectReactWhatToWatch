import {generateFilms} from './mocks/films.js';

const FILMS_COUNT = 50;

const films = generateFilms(FILMS_COUNT);

const initialState = {
  films,
  currentFilms: films,
  currentGenre: `All genres`,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_FILMS: `GET_FILMS`
};

const ActionCreator = {
  changeGenre(changeGenre) {
    return {
      type: `CHANGE_GENRE`,
      payload: changeGenre
    };
  },
  getFilms() {
    return {
      type: `GET_FILMS`,
      payload: null
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return Object.assign({}, state, {
        currentGenre: action.payload
      });
    case ActionType.GET_FILMS:
      let currentFilmsByGenre = state.films.filter((film) => {
        return film.genre === state.currentGenre;
      });

      if (currentFilmsByGenre.length === 0) {
        currentFilmsByGenre = state.films;
      }

      return Object.assign({}, state, {
        currentFilms: currentFilmsByGenre
      });
  }

  return state;
};

export {reducer, ActionCreator};
