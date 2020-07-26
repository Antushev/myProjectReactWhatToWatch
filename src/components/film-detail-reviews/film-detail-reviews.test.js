import React from 'react';
import renderer from 'react-test-renderer';

import {film} from '../../mocks-test/films-test.js';
import {comments} from '../../mocks-test/comment-test.js';

import FilmDetailReviews from './film-detail-reviews.jsx';

describe(`FilmDetailReviewsComponent`, () => {
  it(`FilmDetailReviewsComponentSnapshot`, () => {
    const tree = renderer
      .create(
          <FilmDetailReviews
            film={film}
            comments={comments}
            renderTabs={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
