import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ShowMore from './show-more.jsx';

configure({adapter: new Adapter()});

describe(`ShowMoreComponent`, () => {
  it(`Show more button click`, () => {
    const handleShowMoreClick = jest.fn();

    const showMore = shallow(
        <ShowMore
          handleShowMoreClick={handleShowMoreClick}
        />
    );

    const buttonShowMore = showMore.find(`.catalog__button`);

    buttonShowMore.simulate(`click`);

    expect(handleShowMoreClick).toBeCalled();
  });
});
