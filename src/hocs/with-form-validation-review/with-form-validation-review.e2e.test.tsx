import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import {film} from '../../mocks-test/films-t';

import {Film} from '../../utils/const';

import {withFormValidationReview} from './with-form-validation-review';

configure({adapter: new Adapter()});

const filmTest: Film = film;

const ratingPoints = [0, 1, 2, 3, 4, 5];

interface Props {
  rating: number;
  isLoadingComment: boolean;
  isButtonBlocked: boolean;
  onRatingChange: () => void;
  onTextChange: () => void;
  onSubmitClick: () => void;
}

const FormComponent: React.FunctionComponent<Props> = (props: Props) => {
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

describe(`Test HOC with-from-validation-review`, () => {
  it(`Test component with HOC`, () => {
    const FormComponentWrapped = withFormValidationReview(FormComponent);

    const onRatingChange = jest.fn();
    const onTextChange = jest.fn();
    const onSubmitClick = jest.fn();
    const onTypeScreenChange = jest.fn();

    const formWrapped = mount(
        <FormComponentWrapped
          film={filmTest}
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

    buttonSubmit.simulate(`submit`, {preventDefault: () => null});

    expect(onSubmitClick).toHaveBeenCalledTimes(1);
  });
});
