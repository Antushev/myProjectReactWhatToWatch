import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {Film} from '../../utils/types';
import {noop} from '../../utils/const.js';
import {film} from '../../mocks-test/films-t';

import AddReviewForm from './add-review-form';

const filmTest: Film = film;

describe(`AddReViewFormComponent`, () => {
  it(`AddReviewFormComponentSnapshot with isButtonBlocked true`, () => {
    const tree = renderer
      .create(
          <AddReviewForm
            rating={4}
            isLoadingComment={false}
            isButtonBlocked={true}
            isErrorLoadingComment={false}
            onRatingChange={noop}
            onTextChange={noop}
            onSubmitClick={noop}
            film={filmTest}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`AddReviewFormComponentSnapshot with isButtonBlocked false`, () => {
    const tree = renderer
      .create(
          <AddReviewForm
            rating={4}
            isLoadingComment={false}
            isButtonBlocked={false}
            isErrorLoadingComment={false}
            onRatingChange={noop}
            onTextChange={noop}
            onSubmitClick={noop}
            film={filmTest}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`AddReviewFormComponentSnapshot with isLoadingComment true`, () => {
    const tree = renderer
      .create(
          <AddReviewForm
            rating={4}
            isLoadingComment={true}
            isButtonBlocked={false}
            isErrorLoadingComment={true}
            onRatingChange={noop}
            onTextChange={noop}
            onSubmitClick={noop}
            film={filmTest}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`AddReviewFormComponentSnapshot with isLoadingComment true and isButtonBlocked true`, () => {
    const tree = renderer
      .create(
          <AddReviewForm
            rating={4}
            isLoadingComment={true}
            isButtonBlocked={true}
            isErrorLoadingComment={false}
            onRatingChange={noop}
            onTextChange={noop}
            onSubmitClick={noop}
            film={filmTest}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
