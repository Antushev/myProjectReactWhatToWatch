import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {films, currentGenre} from '../../mocks-test/films-test.js';
import {user} from '../../mocks-test/user-test.js';

import {App} from './app.jsx';

const mockStore = configureStore([]);

describe(`AppComponent`, () => {
  it(`AppComponentSnapshot`, () => {
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
              authorizationStatus={`NO_AUTH`}
              currentFilms={films}
              currentGenre={currentGenre}
              showFilmCardCount={8}
              handleGenreTabClick={() => {}}
              handleShowMoreClick={() => {}}
              handleTypeScreenChange={() => {}}
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
