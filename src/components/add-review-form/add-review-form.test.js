import React from 'react';
import renderer from 'react-test-renderer';

import AddReviewForm from './add-review-form.jsx';

describe(`AddReViewFormComponent`, () => {
  it(`AddReviewFormComponentSnapshot with isButtonBlocked true`, () => {
    const tree = renderer
      .create(
          <AddReviewForm
            rating={4}
            isLoadingComment={false}
            isButtonBlocked={true}
            isErrorLoadingComment={false}
            onRatingChange={() => {}}
            onTextChange={() => {}}
            onSubmitClick={() => {}}
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
            onRatingChange={() => {}}
            onTextChange={() => {}}
            onSubmitClick={() => {}}
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
            onRatingChange={() => {}}
            onTextChange={() => {}}
            onSubmitClick={() => {}}
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
            onRatingChange={() => {}}
            onTextChange={() => {}}
            onSubmitClick={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
