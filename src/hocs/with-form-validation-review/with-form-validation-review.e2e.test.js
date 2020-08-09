import React from 'react';
import PropTypes from 'prop-types';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {withFormValidationReview} from './with-form-validation-review.js';

configure({adapter: new Adapter()});

const ratingPoints = [0, 1, 2, 3, 4, 5];

const FormComponent = (props) => {
  const {
    rating,
    isLoadingComment,
    isButtonBlocked,
    onRatingChange,
    onTextChange,
    onSubmitClick
  } = props;

  return (
    <form action="#" className="add-review__form" onSubmit={onSubmitClick}>
      {ratingPoints.map((point) => (
        <input
          key={point}
          className="rating__input"
          id={`star-${point}`}
          type="radio" name="rating"
          value={`${point}`}
          onChange={onRatingChange}
          defaultChecked={rating === point}
          disabled={isLoadingComment}
        />
      ))}
      <textarea className="add-review__textarea" name="review-text" id="review-text"
        placeholder="Review text" onChange={onTextChange} disabled={isLoadingComment}/>
      <button className="add-review__btn" type="submit" disabled={isButtonBlocked}>Post</button>
    </form>
  );
};

FormComponent.propTypes = {
  rating: PropTypes.number.isRequired,
  isLoadingComment: PropTypes.bool.isRequired,
  isButtonBlocked: PropTypes.bool.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onSubmitClick: PropTypes.func.isRequired
};

describe(`Test HOC with-from-validation-review`, () => {
  it(`Test component with HOC`, () => {
    const FormComponentWrapped = withFormValidationReview(FormComponent);

    const onRatingChange = jest.fn();
    const onTextChange = jest.fn();
    const onSubmitClick = jest.fn();
    const onTypeScreenChange = jest.fn();

    const formWrapped = mount(
        <FormComponentWrapped
          rating={0}
          isButtonBlocked={true}
          isLoadingComment={false}
          onRatingChange={onRatingChange}
          onTextChange={onTextChange}
          onTypeScreenChange={onTypeScreenChange}
          onSubmitClick={onSubmitClick}
        />
    );

    const textarea = formWrapped.find(`textarea`);
    const buttonSubmit = formWrapped.find(`button`);

    expect(buttonSubmit.prop(`disabled`)).toBe(true);

    textarea.simulate(`change`, {target: {value: `This is text`}});
    expect(buttonSubmit.prop(`disabled`)).toBe(true);

    textarea.simulate(`change`, {target: {value: `This is text: svsdvjkesvbnkejlwvbewlkjvbewjklvbewklvrbewlkvrb`}});

    formWrapped.find(`input`).at(4).simulate(`change`, {target: {value: 4}});

    expect(formWrapped.find(`button`).prop(`disabled`)).toBe(false);

    buttonSubmit.simulate(`submit`, {preventDefault: () => {}});

    expect(onSubmitClick).toHaveBeenCalledTimes(1);
  });
});
