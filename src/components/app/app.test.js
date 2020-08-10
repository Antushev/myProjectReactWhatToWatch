import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {NameSpace} from './../../reducer/name-space.js';

import {films, currentGenre} from '../../mocks-test/films-test.js';
import {user} from '../../mocks-test/user-test.js';

import {App} from './app';

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
              films={films}
              user={user}
              authorizationStatus={`NO_AUTH`}
              currentFilms={films}
              currentGenre={currentGenre}
              showFilmCardCount={8}
              onGenreTabClick={() => {}}
              onShowMoreClick={() => {}}
              onTypeScreenChange={() => {}}
              onLoadComments={() => {}}
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
              films={films}
              user={user}
              authorizationStatus={`NO_AUTH`}
              currentFilms={films}
              currentGenre={currentGenre}
              showFilmCardCount={8}
              onGenreTabClick={() => {}}
              onShowMoreClick={() => {}}
              onTypeScreenChange={() => {}}
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
              films={films}
              user={user}
              authorizationStatus={`NO_AUTH`}
              currentFilms={films}
              currentGenre={currentGenre}
              showFilmCardCount={8}
              onGenreTabClick={() => {}}
              onShowMoreClick={() => {}}
              onTypeScreenChange={() => {}}
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
              films={films}
              user={user}
              authorizationStatus={`NO_AUTH`}
              currentFilms={films}
              currentGenre={currentGenre}
              showFilmCardCount={8}
              onGenreTabClick={() => {}}
              onShowMoreClick={() => {}}
              onTypeScreenChange={() => {}}
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
              films={films}
              user={user}
              authorizationStatus={`AUTH`}
              currentFilms={films}
              currentGenre={currentGenre}
              showFilmCardCount={8}
              onGenreTabClick={() => {}}
              onShowMoreClick={() => {}}
              onTypeScreenChange={() => {}}
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
