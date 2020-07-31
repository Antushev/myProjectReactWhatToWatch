import {generateFilms} from './mocks/films.js';

const FILMS_COUNT = 50;
const SHOW_FILMS_CARD_COUNT = 8;

const films = generateFilms(FILMS_COUNT);

const initialState = {
  films,
  currentFilms: films,
  currentGenre: `All genres`,
  showFilmCardCount: SHOW_FILMS_CARD_COUNT
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_FILMS: `GET_FILMS`,
  SHOW_ADDITIONAL_CARD: `SHOW_ADDITIONAL_CARD`,
  RESET_FILM_CARD_COUNT: `RESET_FILM_CARD_COUNT`
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
  },
  showAdditionalCard() {
    return {
      type: `SHOW_ADDITIONAL_CARD`,
      payload: SHOW_FILMS_CARD_COUNT
    };
  },
  resetFilmCardCount() {
    return {
      type: `RESET_FILM_CARD_COUNT`,
      payload: SHOW_FILMS_CARD_COUNT
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
    case ActionType.SHOW_ADDITIONAL_CARD:
      return Object.assign({}, state, {
        showFilmCardCount: state.showFilmCardCount + SHOW_FILMS_CARD_COUNT
      });
    case ActionType.RESET_FILM_CARD_COUNT:
      return Object.assign({}, state, {
        showFilmCardCount: action.payload
      });
  }

  return state;
};

export {reducer, ActionCreator};
