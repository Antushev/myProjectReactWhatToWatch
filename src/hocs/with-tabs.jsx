import React, {PureComponent} from 'react';

import {FilmDetailTabsName} from './../utils/const.js';

import FilmDetailTabs from './../components/film-detail-tabs/film-detail-tabs.jsx';

const withTabs = (FilmDetailComponent) => {
  class FilmDetailComponentWithTabs extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTabDetailPage: FilmDetailTabsName.OVERVIEW
      };
    }

    render() {
      const {activeTabDetailPage} = this.state;

      return <FilmDetailComponent
        {...this.props}
        activeTab={activeTabDetailPage}
        renderTabs={() => {
          return <FilmDetailTabs
            handleTabClick={(activeTab) => {
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
