import React from 'react';
import renderer from 'react-test-renderer';

import {films, currentGenre} from './../../mocks-test/films-test.js';

import {GenresList} from './genres-list.jsx';

describe(`GenresListComponent`, () => {
  it(`GenresListComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <GenresList
            films={films}
            activeItem={currentGenre}
            handleGenreTabClick={() => {}}
            handleActiveItemChange={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
