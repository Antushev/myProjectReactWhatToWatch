import React from 'react';
import PropTypes from 'prop-types';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {FilmDetailTabsName} from '../../utils/const.js';

import {withTabs} from './with-tabs.jsx';

configure({adapter: new Adapter()});

const MockComponent = (props) => {
  const {renderTabs} = props;

  return (
    <div>
      {renderTabs()}
    </div>
  );
};

MockComponent.propTypes = {
  renderTabs: PropTypes.func.isRequired
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
