import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history';

import {film} from '../../mocks-test/films-t';

const filmTest: Film = film;

import FilmCard from './film-card';

describe(`FilmCardComponent`, () => {
  it(`FilmCardComponentSnapshot`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <FilmCard
            film={filmTest}
            renderVideoPlayer={() => null}
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
