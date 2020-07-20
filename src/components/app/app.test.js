import React from 'react';
import renderer from 'react-test-renderer';

import {film, films} from '../../mocks-test/films-test.js';

import App from './app.jsx';

describe(`AppComponent`, () => {
  it(`AppComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <App
            films={films}
            filmName={film.name}
            genre={film.genre}
            date={film.date}
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
