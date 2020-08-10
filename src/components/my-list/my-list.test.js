import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import createStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import history from './../../history.js';

import {NameSpace} from './../../reducer/name-space.js';

import {films as filmsTest} from './../../mocks-test/films-test.js';
import {user} from './../../mocks-test/user-test.js';

import {MyList} from './my-list.jsx';

const mockStore = createStore([]);
const store = mockStore({
  [NameSpace.DATA]: {
    films: filmsTest,
    filmsFavorite: filmsTest,
  }
});

describe(`MyListComponent`, () => {
  it(`MyListComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <MyList
                films={filmsTest}
                filmsFavorite={filmsTest}
                user={user}
                authorizationStatus={`AUTH`}
                loadFilmsFavorite={() => {}}
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
