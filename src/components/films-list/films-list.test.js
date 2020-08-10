import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import createStore from 'redux-mock-store';
import history from './../../history.js';

import {NameSpace} from './../../reducer/name-space.js';

import {film, films} from '../../mocks-test/films-test.js';
import {FilmsListType} from '../../mocks-test/films-test.js';

import FilmsList from './films-list.jsx';

const mockStore = createStore([]);
const store = mockStore({
  [NameSpace.DATA]: {
    filmActive: film
  }
});

describe(`FilmsListComponent`, () => {
  it(`FilmcListComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <FilmsList
                currentFilm={film}
                films={films}
                showFilmCardCount={8}
                filmListType={FilmsListType.DEFAULT}
                onFilmClick={() => {}}
              />
            </Provider>
          </Router>, {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
