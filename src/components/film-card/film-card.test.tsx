import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history.js';

import {film} from '../../mocks-test/films-test.js';

import FilmCard from './film-card';

describe(`FilmCardComponent`, () => {
  it(`FilmCardComponentSnapshot`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <FilmCard
            film={film}
            onFilmClick={() => {}}
            handleFilmCardMouseOver={() => {}}
            renderVideoPlayer={() => {}}
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
