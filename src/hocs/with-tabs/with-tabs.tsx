import * as React from 'react';
import {Subtract} from 'utility-types';

import {FilmDetailTabsName} from '../../utils/const';

import FilmDetailTabs from '../../components/film-detail-tabs/film-detail-tabs';

interface State {
  activeTabDetailPage: string;
}

interface InjectingProps {
  activeTab: string;
  renderTabs: () => React.ReactNode;
}

const withTabs = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class FilmDetailComponentWithTabs extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeTabDetailPage: FilmDetailTabsName.OVERVIEW
      };
    }

    render() {
      const {activeTabDetailPage} = this.state;

      return <Component
        {...this.props}
        activeTab={activeTabDetailPage}
        renderTabs={() => {
          return <FilmDetailTabs
            onTabClick={(activeTab) => {
              this.setState({
                activeTabDetailPage: activeTab
              });
            }}
          />;
        }}
      />;
    }
  }

  return FilmDetailComponentWithTabs;
};

export {withTabs};
