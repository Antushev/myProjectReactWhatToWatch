import React from 'react';
import renderer from 'react-test-renderer';

import {withTabs} from './with-tabs.jsx';

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withTabs(MockComponent);

describe(`Tests HOC with-tabs`, () => {
  it(`Test HOC with-tabs`, () => {
    const tree = renderer
      .create(
          <MockComponentWrapped
            activeTab={`OVERVIEW`}
            renderTabs={() => {}}
          />, {
            createNodeMock() {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
