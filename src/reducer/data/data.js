import {filmAdapter, filmsAdapter} from '../../adapters/film-adapter.js';
import {commentsAdapter} from '../../adapters/comments-adapter.js';

const getFilmsNew = (filmNew, state) => {
  const filmIndex = state.films.findIndex((film) => film.id === filmNew.id);
  const filmsCurrent = state.films.slice();
  return [].concat(filmsCurrent.slice(0, filmIndex), filmNew, filmsCurrent.slice(filmIndex + 1));
};

const initialState = {
  isLoading: false,
  isLoadingComment: false,
  isLoadingFilmsFavorite: true,
  isError: false,
  isErrorLoadingComment: false,
  films: null,
  filmsFavorite: null,
  filmPromo: null,
  filmActive: null,
  comments: null,
  currentGenre: `All genres`
};

const ActionType = {
  START_LOAD: `START_LOAD`,
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_FILM_PROMO: `LOAD_FILM_PROMO`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  END_LOAD: `END_LOAD`,
  GET_FILMS: `GET_FILMS`,
  CHANGE_GENRE: `CHANGE_FILTER`,
  PUT_ERROR: `PUT_ERROR`,
  PUT_ERROR_LOADING_COMMENT: `PUT_ERROR_LOADING_COMMENT`,
  REMOVE_ERROR_LOADING_COMMENT: `REMOVE_ERROR_LOADING_COMMENT`,
  REMOVE_ERROR: `REMOVE_ERROR`,
  START_ADD_COMMENT: `START_LOAD_COMMENT`,
  END_ADD_COMMENT: `END_LOAD_COMMENT`,
  ADD_FILM_IN_MY_LIST: `ADD_FILM_IN_MY_LIST`,
  ADD_FILM_ACTIVE: `ADD_FILM_ACTIVE`,
  START_LOAD_FILMS_FAVORITE: `START_LOAD_FILMS_FAVORITE`,
  LOAD_FILMS_FAVORITE: `LOAD_FILMS_FAVORITE`,
  END_LOAD_FILMS_FAVORITE: `END_LOAD_FILMS_FAVORITE`
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
  startLoadFilmsFavorite() {
    return {
      type: ActionType.START_LOAD_FILMS_FAVORITE,
      payload: true
    };
  },
  loadFilmsFavorite(filmsFavorite) {
    return {
      type: ActionType.LOAD_FILMS_FAVORITE,
      payload: filmsFavorite
    };
  },
  endLoadFilmsFavorite() {
    return {
      type: ActionType.END_LOAD_FILMS_FAVORITE,
      payload: false
    };
  },
  loadFilmPromo(film) {
    return {
      type: ActionType.LOAD_FILM_PROMO,
      payload: film
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
  putErrorLoadingComment() {
    return {
      type: ActionType.PUT_ERROR_LOADING_COMMENT,
      payload: true
    };
  },
  removeErrorLoadingComment() {
    return {
      type: ActionType.REMOVE_ERROR_LOADING_COMMENT,
      payload: false
    };
  },
  removeError() {
    return {
      type: ActionType.REMOVE_ERROR,
      payload: false
    };
  },
  loadComments(comments) {
    return {
      type: ActionType.LOAD_COMMENTS,
      payload: comments
    };
  },
  startLoadComment() {
    return {
      type: ActionType.START_ADD_COMMENT,
      payload: null
    };
  },
  endLoadComment() {
    return {
      type: ActionType.END_ADD_COMMENT,
      payload: null
    };
  },
  addFilmInMyList(film) {
    return {
      type: ActionType.ADD_FILM_IN_MY_LIST,
      payload: film
    };
  },
  addFilmActive(film) {
    return {
      type: ActionType.ADD_FILM_ACTIVE,
      payload: film
    };
  }
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.removeError());
    return api.get(`/films`)
      .then((response) => {
        const films = filmsAdapter(response.data);
        dispatch(ActionCreator.loadFilms(films));
      })
      .then(() => api.get(`/films/promo`))
      .then((response) => {
        const filmPromo = filmAdapter(response.data);
        dispatch(ActionCreator.loadFilmPromo(filmPromo));
        dispatch(ActionCreator.addFilmActive(filmPromo));
      })
      .then(() => {
        dispatch(ActionCreator.endLoad());
      })
      .catch(() => {
        dispatch(ActionCreator.endLoad());
        dispatch(ActionCreator.putError());
      });
  },
  loadComment: (idFilm) => (dispatch, getState, api) => {
    dispatch(ActionCreator.removeError());
    dispatch(ActionCreator.startLoadComment());
    return api.get(`/comments/${idFilm}`)
      .then((response) => {
        const comments = commentsAdapter(response.data);

        dispatch(ActionCreator.loadComments(comments));
        dispatch(ActionCreator.endLoadComment());
      })
      .catch((err) => {
        dispatch(ActionCreator.endLoadComment());
        dispatch(ActionCreator.putError());
        throw err;
      });
  },
  addComment: (idFilm, comment) => (dispatch, getState, api) => {
    dispatch(ActionCreator.startLoadComment());
    dispatch(ActionCreator.removeErrorLoadingComment());
    return api.post(`/comments/${idFilm}`, {
      rating: comment.rating,
      comment: comment.comment
    })
      .then((response) => {
        const comments = commentsAdapter(response.data);
        dispatch(ActionCreator.loadComments(comments));
        dispatch(ActionCreator.endLoadComment());
      })
      .catch((err) => {
        dispatch(ActionCreator.endLoadComment());
        dispatch(ActionCreator.putErrorLoadingComment());
        throw err;
      });
  },
  loadFilmsFavorite: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.startLoadFilmsFavorite());
    return api.get(`/favorite`)
      .then((response) => {
        const filmsFavorite = filmsAdapter(response.data);

        dispatch(ActionCreator.loadFilmsFavorite(filmsFavorite));
        dispatch(ActionCreator.endLoadFilmsFavorite());
      })
      .catch((err) => {
        dispatch(ActionCreator.endLoadFilmsFavorite());
        throw err;
      });
  },
  addFilmInMyList: (idFilm, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${idFilm}/${status ? 1 : 0}`)
      .then((response) => {
        const film = filmAdapter(response.data);

        const {DATA: {filmPromo}} = getState();

        if (film.id === filmPromo.id) {
          dispatch(ActionCreator.loadFilmPromo(film));
        }

        dispatch(ActionCreator.addFilmInMyList(film));
      })
      .catch((err) => {
        throw err;
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
    case ActionType.LOAD_FILM_PROMO:
      return Object.assign({}, state, {
        filmPromo: action.payload
      });
    case ActionType.LOAD_COMMENTS:
      return Object.assign({}, state, {
        comments: action.payload
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
        isError: true
      });
    case ActionType.REMOVE_ERROR:
      return Object.assign({}, state, {
        isError: false
      });
    case ActionType.PUT_ERROR_LOADING_COMMENT:
      return Object.assign({}, state, {
        isErrorLoadingComment: true
      });
    case ActionType.REMOVE_ERROR_LOADING_COMMENT:
      return Object.assign({}, state, {
        isErrorLoadingComment: false
      });
    case ActionType.START_ADD_COMMENT:
      return Object.assign({}, state, {
        isLoadingComment: true
      });
    case ActionType.END_ADD_COMMENT:
      return Object.assign({}, state, {
        isLoadingComment: false
      });
    case ActionType.ADD_FILM_IN_MY_LIST:
      const filmNew = action.payload;
      const filmsNew = getFilmsNew(filmNew, state);

      return Object.assign({}, state, {
        films: filmsNew
      });
    case ActionType.ADD_FILM_ACTIVE:
      return Object.assign({}, state, {
        filmActive: action.payload
      });
    case ActionType.START_LOAD_FILMS_FAVORITE:
      return Object.assign({}, state, {
        isLoadingFilmsFavorite: true
      });
    case ActionType.LOAD_FILMS_FAVORITE:
      return Object.assign({}, state, {
        filmsFavorite: action.payload
      });
    case ActionType.END_LOAD_FILMS_FAVORITE:
      return Object.assign({}, state, {
        isLoadingFilmsFavorite: false
      });
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};
