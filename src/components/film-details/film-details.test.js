import React from 'react';
import renderer from 'react-test-renderer';

import {film, films} from '../../mocks-test/films-test.js';

import FilmDetails from './film-details.jsx';

const activeTab = `overview`;

describe(`FilmDetailsComponent`, () => {
  it(`FilmDetailsComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <FilmDetails
            film={film}
            films={films}
            activeTab={activeTab}
            renderTabs={() => {}}
            handleFilmClick={() => {}}
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
