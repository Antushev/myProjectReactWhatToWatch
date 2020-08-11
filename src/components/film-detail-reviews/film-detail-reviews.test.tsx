import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {film} from '../../mocks-test/films-t';
import {comments} from '../../mocks-test/comment-t';

import {Film, Comment} from '../../utils/types';

import FilmDetailReviews from './film-detail-reviews';

const filmTest: Film = film;
const commentsTest: Comment[] = comments;

describe(`FilmDetailReviewsComponent`, () => {
  it(`FilmDetailReviewsComponentSnapshot`, () => {
    const renderTabs = jest.fn();

    const tree = renderer
      .create(
          <FilmDetailReviews
            film={filmTest}
            comments={commentsTest}
            renderTabs={renderTabs}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
