import React from 'react';
import PropTypes from 'prop-types';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {withActiveItem} from './with-active-item.jsx';

configure({adapter: new Adapter()});

const MockList = (props) => {
  const {handleActiveItemChange} = props;

  return <div>
    <span className="active-element" onClick={() => handleActiveItemChange(2)} />
  </div>;
};

MockList.propTypes = {
  handleActiveItemChange: PropTypes.func.isRequired
};

describe(`Tests HOC with-active-item`, () => {
  it(`Test HOC with-active-item`, () => {
    const MockListWrapped = withActiveItem(MockList);
    const wrapped = mount(
        <MockListWrapped
          activeItem={`item`}
          handleActiveItemChange={() => {}}
        />
    );

    const activeElement = wrapped.find(`.active-element`);

    activeElement.simulate(`click`);

    expect(wrapped.props().activeItem).toEqual(`item`);
  });
});
