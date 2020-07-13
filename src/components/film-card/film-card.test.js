import React from 'react';
import renderer from 'react-test-renderer';

import {film} from '../../utils/films-test.js';

import FilmCard from './film-card.jsx';

describe(`FilmCardComponent`, () => {
  it(`FilmCardComponentSnapshot`, () => {
    const tree = renderer.create(
        <FilmCard
          film={film}
          handleHeaderClick={() => {}}
          handleFilmCardMouseOver={() => {}}
        />
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
