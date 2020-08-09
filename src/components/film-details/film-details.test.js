import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history.js';

import {film, films} from '../../mocks-test/films-test.js';
import {user} from '../../mocks-test/user-test.js';
import {comments} from '../../mocks-test/comment-test.js';

import FilmDetails from './film-details.jsx';

const activeTab = `overview`;

describe(`FilmDetailsComponent`, () => {
  it(`FilmDetailsComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <FilmDetails
              film={film}
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
