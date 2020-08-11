import * as React from 'react';
import * as renderer from 'react-test-renderer'
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import createStore from 'redux-mock-store';
import history from './../../history';

import {NameSpace} from '../../reducer/name-space';

import {film, films} from '../../mocks-test/films-t';
import {FilmsListType} from '../../mocks-test/films-t';

import {Film} from '../../utils/types';

const filmTest: Film = film;
const filmsTest: Film[] = films;

import FilmsList from './films-list';

const mockStore = createStore([]);
const store = mockStore({
  [NameSpace.DATA]: {
    filmActive: film
  }
});

describe(`FilmsListComponent`, () => {
  it(`FilmsListComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <FilmsList
                currentFilm={filmTest}
                films={filmsTest}
                showFilmCardCount={8}
                filmListType={FilmsListType.DEFAULT}
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
