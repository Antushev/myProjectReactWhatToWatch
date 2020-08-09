import {filmAdapter, filmsAdapter} from '../../adapters/film-adapter.js';
import {commentsAdapter} from '../../adapters/comments-adapter.js';

const initialState = {
  isLoading: false,
  isLoadingComment: false,
  isError: false,
  films: null,
  filmPromo: null,
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
  REMOVE_ERROR: `REMOVE_ERROR`,
  START_ADD_COMMENT: `START_LOAD_COMMENT`,
  END_ADD_COMMENT: `END_LOAD_COMMENT`
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
  startAddComment() {
    return {
      type: ActionType.START_ADD_COMMENT,
      payload: null
    };
  },
  endAddComment() {
    return {
      type: ActionType.END_ADD_COMMENT,
      payload: null
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
    dispatch(ActionCreator.startLoad());
    return api.get(`/comments/${idFilm}`)
      .then((response) => {
        const comments = commentsAdapter(response.data);

        dispatch(ActionCreator.loadComments(comments));
        dispatch(ActionCreator.endLoad());
      })
      .catch((err) => {
        dispatch(ActionCreator.putError());
        throw err;
      });
  },
  addComment: (idFilm, comment) => (dispatch, getState, api) => {
    dispatch(ActionCreator.startAddComment());
    return api.post(`/comments/${idFilm}`, {
      rating: comment.rating,
      comment: comment.comment
    })
      .then((response) => {
        const comments = commentsAdapter(response.data);
        dispatch(ActionCreator.loadComments(comments));
        dispatch(ActionCreator.endAddComment());
      })
      .catch((err) => {
        dispatch(ActionCreator.endAddComment());
        dispatch(ActionCreator.putError());
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
    case ActionType.START_ADD_COMMENT:
      return Object.assign({}, state, {
        isLoadingComment: true
      });
    case ActionType.END_ADD_COMMENT:
      return Object.assign({}, state, {
        isLoadingComment: false
      });
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};
