import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../api.js';
import {reducer, ActionCreator, Operation} from './data.js';

import {films} from '../../mocks-test/films-t.js';
import {comments} from '../../mocks-test/comment-t.js';

const state = {
  isLoading: false,
  isLoadingComment: false,
  isLoadingFilmsFavorite: true,
  isError: false,
  isErrorLoadingComment: false,
  films,
  filmsFavorite: null,
  filmPromo: null,
  filmActive: null,
  comments: null,
  currentGenre: `All genres`
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

  it(`Is loading true`, () => {
    const newState = Object.assign({}, state, {
      isLoading: true
    });

    expect(reducer(state, ActionCreator.startLoad())).toEqual(newState);
  });

  it(`Is loading false`, () => {
    const newState = Object.assign({}, state, {
      isLoading: false
    });

    expect(reducer(state, ActionCreator.endLoad())).toEqual(newState);
  });

  it(`Is loading comments true`, () => {
    const newState = Object.assign({}, state, {
      isLoadingComment: true
    });

    expect(reducer(state, ActionCreator.startLoadComment())).toEqual(newState);
  });

  it(`Is loading comments false`, () => {
    const newState = Object.assign({}, state, {
      isLoadingComment: false
    });

    expect(reducer(state, ActionCreator.endLoadComment())).toEqual(newState);
  });

  it(`Is loading films favorite true`, () => {
    const newState = Object.assign({}, state, {
      isLoadingFilmsFavorite: true
    });

    expect(reducer(state, ActionCreator.startLoadFilmsFavorite())).toEqual(newState);
  });

  it(`Is loading films favorite false`, () => {
    const newState = Object.assign({}, state, {
      isLoadingFilmsFavorite: false
    });

    expect(reducer(state, ActionCreator.endLoadFilmsFavorite())).toEqual(newState);
  });

  it(`Is error true`, () => {
    const newState = Object.assign({}, state, {
      isError: true
    });

    expect(reducer(state, ActionCreator.putError())).toEqual(newState);
  });

  it(`Is error false`, () => {
    const newState = Object.assign({}, state, {
      isError: false
    });

    expect(reducer(state, ActionCreator.removeError())).toEqual(newState);
  });

  it(`Is error loading comment true`, () => {
    const newState = Object.assign({}, state, {
      isErrorLoadingComment: true
    });

    expect(reducer(state, ActionCreator.putErrorLoadingComment())).toEqual(newState);
  });

  it(`Is error loading comment false`, () => {
    const newState = Object.assign({}, state, {
      isErrorLoadingComment: false
    });

    expect(reducer(state, ActionCreator.removeErrorLoadingComment())).toEqual(newState);
  });

  it(`Add film active`, () => {
    const film = films[0];

    const newState = Object.assign({}, state, {
      filmActive: film
    });

    expect(reducer(state, ActionCreator.addFilmActive(film))).toEqual(newState);
  });

  it(`Change genre`, () => {
    const genre = `Adventure`;

    const newState = Object.assign({}, state, {
      currentGenre: genre
    });

    expect(reducer(state, ActionCreator.changeGenre(genre))).toEqual(newState);
  });

  it(`Put comments`, () => {
    const commentsTest = comments;

    const newState = Object.assign({}, state, {
      comments: commentsTest
    });

    expect(reducer(state, ActionCreator.loadComments(commentsTest))).toEqual(newState);
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
