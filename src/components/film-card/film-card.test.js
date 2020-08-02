import React from 'react';
import renderer from 'react-test-renderer';

import {film} from '../../mocks-test/films-test.js';

import FilmCard from './film-card.jsx';

describe(`FilmCardComponent`, () => {
  it(`FilmCardComponentSnapshot`, () => {
    const tree = renderer.create(
        <FilmCard
          film={film}
          handleFilmClick={() => {}}
          handleFilmCardMouseOver={() => {}}
          renderVideoPlayer={() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
