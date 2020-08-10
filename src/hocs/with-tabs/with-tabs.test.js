import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';

import {withTabs} from './with-tabs';

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
  it(`Test snapshot HOC function renderTabs`, () => {
    const MockComponentWrapped = withTabs(MockComponent);

    const tree = renderer
      .create(
          <MockComponentWrapped />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
