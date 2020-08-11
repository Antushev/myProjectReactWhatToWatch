import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import createStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import history from './../../history';

import {NameSpace} from '../../reducer/name-space';

import {films as filmsTest} from '../../mocks-test/films-t.js';
import {user} from '../../mocks-test/user-t';

import {MyList} from './my-list';

const filmsTestMyList: Film[] = filmsTest;
const userTest: UserMaximum = user;

const mockStore = createStore([]);
const store = mockStore({
  [NameSpace.DATA]: {
    films: filmsTest,
    filmsFavorite: filmsTest,
  }
});

describe(`MyListComponent`, () => {
  it(`MyListComponentSnapshot load films`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <MyList
                filmsFavorite={filmsTestMyList}
                user={userTest}
                authorizationStatus={`AUTH`}
                loadFilmsFavorite={() => null}
                isLoadingFilmsFavorite={false}
              />,
            </Provider>
          </Router>,
          {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it(`MyListComponentSnapshot loading films`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <MyList
                filmsFavorite={filmsTestMyList}
                user={userTest}
                authorizationStatus={`AUTH`}
                loadFilmsFavorite={() => null}
                isLoadingFilmsFavorite={true}
              />,
            </Provider>
          </Router>,
          {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it(`MyListComponentSnapshot no auth user`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <MyList
                filmsFavorite={filmsTestMyList}
                user={userTest}
                authorizationStatus={`NO_AUTH`}
                loadFilmsFavorite={() => null}
                isLoadingFilmsFavorite={false}
              />,
            </Provider>
          </Router>,
          {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
