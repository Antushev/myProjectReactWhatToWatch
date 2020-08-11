import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import {FilmDetailTabsName} from '../../utils/const.js';

import {withTabs} from './with-tabs';

configure({adapter: new Adapter()});


interface Props {
  renderTabs: () => React.ReactNode
}

const MockComponent: React.FunctionComponent<Props> = (props:Props) => {
  const {renderTabs} = props;

  return (
    <div>
      {renderTabs()}
    </div>
  );
};

describe(`Test HOC with-tabs`, () => {
  it(`Test HOC with-tabs where click tab`, () => {
    const MockComponentWrapped = withTabs(MockComponent);

    const renderTabs = jest.fn();

    const wrapped = mount(
        <MockComponentWrapped
          activeTab={FilmDetailTabsName.OVERVIEW}
          renderTabs={renderTabs}
        />
    );

    expect(wrapped.props().activeTab).toBe(FilmDetailTabsName.OVERVIEW);
  });
});
