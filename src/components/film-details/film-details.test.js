import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history.js';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {NameSpace} from './../../reducer/name-space.js';

import {film, films} from '../../mocks-test/films-test.js';
import {user} from '../../mocks-test/user-test.js';
import {comments} from '../../mocks-test/comment-test.js';

import FilmDetails from './film-details.jsx';

const activeTab = `overview`;

const mockStore = configureStore([]);

describe(`FilmDetailsComponent`, () => {
  it(`FilmDetailsComponentSnapshot`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        films
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <Router history={history}>
              <FilmDetails
                filmDetail={film}
                films={films}
                user={user}
                comments={comments}
                authorizationStatus={`NO_AUTH`}
                activeTab={activeTab}
                renderTabs={() => {}}
                onFilmClick={() => {}}
                onPlayClick={() => {}}
                onTypeScreenChange={() => {}}
              />
            </Router>
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
