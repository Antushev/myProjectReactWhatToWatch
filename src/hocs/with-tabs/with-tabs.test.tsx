import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {withTabs} from './with-tabs';

interface Props {
  renderTabs: () => React.ReactNode;
}

const MockComponent: React.FunctionComponent<Props> = (props: Props) => {
  const {renderTabs} = props;

  return (
    <div>
      {renderTabs()}
    </div>
  );
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
