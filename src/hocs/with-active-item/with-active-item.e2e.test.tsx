import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import {withActiveItem} from './with-active-item';

configure({adapter: new Adapter()});

interface Props {
  onActiveItemChange: (value: number) => void;
}

const MockList: React.FunctionComponent<Props> = (props: Props) => {
  const {onActiveItemChange} = props;

  return <div>
    <span className="active-element" onClick={() => onActiveItemChange(2)} />
  </div>;
};


describe(`Tests HOC with-active-item`, () => {
  it(`Test HOC with-active-item`, () => {
    const MockListWrapped = withActiveItem(MockList);
    const onActiveItemChange = jest.fn();

    const wrapped = mount(
        <MockListWrapped
          activeItem={`item`}
          onActiveItemChange={onActiveItemChange}
        />
    );

    const activeElement = wrapped.find(`.active-element`);

    activeElement.simulate(`click`);

    expect(wrapped.props().activeItem).toEqual(`item`);
  });
});
