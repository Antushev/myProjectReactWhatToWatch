import React from 'react';
import renderer from 'react-test-renderer';

import AddReviewForm from './add-review-form.jsx';

describe(`AddReViewFormComponent`, () => {
  it(`AddReviewFormComponentSnapshot with isButtonBlocked true`, () => {
    const tree = renderer
      .create(
          <AddReviewForm
            isLoadingComment={false}
            isButtonBlocked={true}
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
            isLoadingComment={false}
            isButtonBlocked={false}
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
            isLoadingComment={true}
            isButtonBlocked={false}
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
            isLoadingComment={true}
            isButtonBlocked={true}
            onRatingChange={() => {}}
            onTextChange={() => {}}
            onSubmitClick={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
