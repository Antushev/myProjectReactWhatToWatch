import {AuthorizationStatus} from './utils/const.js';
import {filmsAdapter} from './adapters/film-adapter.js';

const SHOW_FILMS_CARD_COUNT = 8;

const initialState = {
  isLoading: true,
  films: null,
  currentFilms: null,
  showFilmCardCount: SHOW_FILMS_CARD_COUNT,
  authorizationStatus: AuthorizationStatus.NO_AUTH
};

const ActionType = {
  START_LOAD: `START_LOAD`,
  LOAD_FILMS: `LOAD_FILMS`,
  END_LOAD: `END_LOAD`,
  GET_FILMS: `GET_FILMS`,
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_ADDITIONAL_CARD: `SHOW_ADDITIONAL_CARD`,
  RESET_FILM_CARD_COUNT: `RESET_FILM_CARD_COUNT`,
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`
};

const ActionCreator = {
  startLoad() {
    return {
      type: ActionType.START_LOAD,
      payload: true
    };
  },
  loadFilms(filmsLoad) {
    return {
      type: ActionType.LOAD_FILMS,
      payload: filmsLoad
    };
  },
  endLoad() {
    return {
      type: ActionType.END_LOAD,
      payload: false
    };
  },
  getFilms(genre) {
    return {
      type: ActionType.GET_FILMS,
      payload: genre
    };
  },
  showAdditionalCard() {
    return {
      type: ActionType.SHOW_ADDITIONAL_CARD,
      payload: SHOW_FILMS_CARD_COUNT
    };
  },
  resetFilmCardCount() {
    return {
      type: ActionType.RESET_FILM_CARD_COUNT,
      payload: SHOW_FILMS_CARD_COUNT
    };
  },
  requireAuthorization(authorizationStatus) {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: authorizationStatus
    };
  }
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    ActionCreator.startLoad();
    return api.get(`/films`)
      .then((response) => {
        const films = filmsAdapter(response.data);
        dispatch(ActionCreator.loadFilms(films));
      })
      .then(() => {
        dispatch(ActionCreator.endLoad());
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.START_LOAD:
      return Object.assign({}, state, {
        isLoading: true
      });
    case ActionType.LOAD_FILMS:
      return Object.assign({}, state, {
        films: action.payload,
        currentFilms: action.payload
      });
    case ActionType.END_LOAD:
      return Object.assign({}, state, {
        isLoading: false
      });
    case ActionType.GET_FILMS:
      let currentFilmsByGenre = state.films.filter((film) => {
        return film.genre === action.payload;
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
    case ActionType.REQUIRE_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.type
      });
  }

  return state;
};

export {reducer, ActionCreator, Operation};
