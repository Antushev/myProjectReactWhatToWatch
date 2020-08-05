import {filmsAdapter} from '../../adapters/film-adapter.js';

const initialState = {
  isLoading: true,
  isError: false,
  films: null,
  currentFilter: `All genres`
};

const ActionType = {
  START_LOAD: `START_LOAD`,
  LOAD_FILMS: `LOAD_FILMS`,
  END_LOAD: `END_LOAD`,
  GET_FILMS: `GET_FILMS`,
  CHANGE_GENRE: `CHANGE_FILTER`,
  PUT_ERROR: `PUT_ERROR`,
  REMOVE_ERROR: `REMOVE_ERROR`
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
  changeGenre(genre) {
    return {
      type: ActionType.CHANGE_GENRE,
      payload: genre
    };
  },
  putError() {
    return {
      type: ActionType.PUT_ERROR,
      payload: true
    };
  },
  removeError() {
    return {
      type: ActionType.REMOVE_ERROR,
      payload: false
    };
  }
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    ActionCreator.removeError();
    ActionCreator.startLoad();
    return api.get(`/films`)
      .then((response) => {
        const films = filmsAdapter(response.data);
        dispatch(ActionCreator.loadFilms(films));
      })
      .then(() => {
        dispatch(ActionCreator.endLoad());
      })
      .catch(() => {
        ActionCreator.putError();
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
        films: currentFilmsByGenre
      });
    case ActionType.CHANGE_GENRE:
      return Object.assign({}, state, {
        currentGenre: action.payload
      });
    case ActionType.PUT_ERROR:
      return Object.assign({}, state, {
        isError: action.payload
      });
    case ActionType.REMOVE_ERROR:
      return Object.assign({}, state, {
        isError: action.payload
      });
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};
