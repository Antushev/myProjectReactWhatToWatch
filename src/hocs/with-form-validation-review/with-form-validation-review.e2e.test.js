import React from 'react';
import PropTypes from 'prop-types';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {withFormValidationReview} from './with-form-validation-review.js';

configure({adapter: new Adapter()});

const FormComponent = (props) => {
  const {
    isLoadingComment,
    isButtonBlocked,
    onRatingChange,
    onTextChange,
    onSubmitClick
  } = props;

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={onSubmitClick}>
        <div className="rating">
          <div className="rating__stars">
            <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
            <label className="rating__label" htmlFor="star-1" onChange={onRatingChange}>Rating 1</label>

            <input className="rating__input" id="star-2" type="radio" name="rating" value="2"/>
            <label className="rating__label" htmlFor="star-2" onChange={onRatingChange}>Rating 2</label>

            <input className="rating__input" id="star-3" type="radio" name="rating" value="3" checked/>
            <label className="rating__label" htmlFor="star-3" onChange={onRatingChange}>Rating 3</label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text"
            placeholder="Review text" onChange={onTextChange} disabled={isLoadingComment}/>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={isButtonBlocked}>Post</button>
          </div>

        </div>
      </form>
    </div>
  );
};

FormComponent.propTypes = {
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

    const formWrapped = mount(
        <FormComponentWrapped
          isButtonBlocked={true}
          isLoadingComment={false}
          onRatingChange={onRatingChange}
          onTextChange={onTextChange}
          onSubmitClick={onSubmitClick}
        />
    );

    const textarea = formWrapped.find(`textarea`);
    const buttonSubmit = formWrapped.find(`button`);

    expect(buttonSubmit.prop(`disabled`)).toBe(true);

    textarea.simulate(`change`, {target: {value: `This is text`}});
    expect(buttonSubmit.prop(`disabled`)).toBe(true);

    textarea.simulate(`change`, {target: {value: `This is text: svsdvjkesvbnkejlwvbewlkjvbewjklvbewklvrbewlkvrb`}});
    expect(formWrapped.find(`button`).prop(`disabled`)).toBe(false);

    buttonSubmit.simulate(`submit`, {preventDefault: () => {}});

    expect(onSubmitClick).toHaveBeenCalledTimes(1);
  });
});
