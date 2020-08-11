import * as React from 'react';
import * as renderer from 'react-test-renderer'
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {NameSpace} from './../../reducer/name-space';

import {film, films, currentGenre} from '../../mocks-test/films-t';
import {user} from '../../mocks-test/user-t';
import {comments} from '../../mocks-test/comment-t';

import {Film, UserMaximum, Comment} from '../../utils/types';
import {noop} from './../../utils/const';

import {App} from './app';

const filmTest: Film = film;
const filmsTest: Film[] = films;
const userTest: UserMaximum = user;
const commentsTest: Comment[] = comments;

const mockStore = configureStore([]);

describe(`AppComponent`, () => {
  it(`AppComponentSnapshot isLoading true isError false authorizationStatus NO_AUTH`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        films,
        currentGenre
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              isLoading={true}
              isError={false}
              typeScreenActive={`MAIN_SCREEN`}
              films={filmsTest}
              authorizationStatus={`NO_AUTH`}
              showFilmCardCount={8}
              onGenreTabClick={noop}
              onShowMoreClick={noop}
              onTypeScreenChange={noop}
              onLoadComments={noop}
              comments={commentsTest}
              filmActive={filmTest}
              filmPromo={filmTest}
              onFilmMyListClick={noop}
              user={userTest}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`AppComponentSnapshot isLoading true isError true`, () => {
    const store = mockStore({
      films,
      currentFilms: films,
      currentGenre
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              isLoading={true}
              isError={true}
              typeScreenActive={`MAIN_SCREEN`}
              films={filmsTest}
              authorizationStatus={`NO_AUTH`}
              showFilmCardCount={8}
              onGenreTabClick={noop}
              onShowMoreClick={noop}
              onTypeScreenChange={noop}
              onLoadComments={noop}
              comments={commentsTest}
              filmActive={filmTest}
              filmPromo={filmTest}
              onFilmMyListClick={noop}
              user={userTest}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`AppComponentSnapshot isLoading false isError true`, () => {
    const store = mockStore({
      films,
      currentFilms: films,
      currentGenre
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              isLoading={false}
              isError={true}
              typeScreenActive={`MAIN_SCREEN`}
              films={filmsTest}
              authorizationStatus={`NO_AUTH`}
              showFilmCardCount={8}
              onGenreTabClick={noop}
              onShowMoreClick={noop}
              onTypeScreenChange={noop}
              onLoadComments={noop}
              comments={commentsTest}
              filmActive={filmTest}
              filmPromo={filmTest}
              onFilmMyListClick={noop}
              user={userTest}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`AppComponentSnapshot isLoading false isError false`, () => {
    const store = mockStore({
      films,
      currentFilms: films,
      currentGenre
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              isLoading={false}
              isError={true}
              typeScreenActive={`MAIN_SCREEN`}
              films={filmsTest}
              authorizationStatus={`NO_AUTH`}
              showFilmCardCount={8}
              onGenreTabClick={noop}
              onShowMoreClick={noop}
              onTypeScreenChange={noop}
              onLoadComments={noop}
              comments={commentsTest}
              filmActive={filmTest}
              filmPromo={filmTest}
              onFilmMyListClick={noop}
              user={userTest}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`AppComponentSnapshot authorizationStatus AUTH`, () => {
    const store = mockStore({
      films,
      currentFilms: films,
      currentGenre
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              isLoading={true}
              isError={false}
              typeScreenActive={`MAIN_SCREEN`}
              films={filmsTest}
              authorizationStatus={`NO_AUTH`}
              showFilmCardCount={8}
              onGenreTabClick={noop}
              onShowMoreClick={noop}
              onTypeScreenChange={noop}
              onLoadComments={noop}
              comments={commentsTest}
              filmActive={filmTest}
              filmPromo={filmTest}
              onFilmMyListClick={noop}
              user={userTest}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
