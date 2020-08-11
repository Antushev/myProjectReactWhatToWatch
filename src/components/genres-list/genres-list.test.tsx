import * as React from 'react';
import * as renderer from 'react-test-renderer'

import {films, currentGenre} from '../../mocks-test/films-t';

import {Film} from '../../utils/types';
import {noop} from '../../utils/const';

import {GenresList} from './genres-list';

const filmsTest: Film[] = films;

describe(`GenresListComponent`, () => {
  it(`GenresListComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <GenresList
            films={filmsTest}
            activeItem={currentGenre}
            onGenreTabClick={noop}
            onActiveItemChange={noop}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
