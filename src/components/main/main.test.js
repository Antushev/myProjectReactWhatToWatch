import React from 'react';
import renderer from 'react-test-renderer';

import {film, films} from '../../mocks-test/films-test.js';

import Main from './main.jsx';

describe(`MainComponent`, () => {
  it(`MainComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <Main
            films={films}
            filmName={film.name}
            genre={film.genre}
            date={film.date}
            handleHeaderClick={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
