import React, {PureComponent} from 'react';

import {FilmDetailTabsName} from './../utils/const.js';

import FilmDetailTabs from './../components/film-detail-tabs/film-detail-tabs.jsx';

const withTabs = (FilmDetailComponent) => {
  class FilmDetailComponentWithTabs extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeFilmDetailPage: FilmDetailTabsName.OVERVIEW
      };
    }

    render() {
      const {activeFilmDetailPage} = this.state;

      return <FilmDetailComponent
        {...this.props}
        activeTab={activeFilmDetailPage}
        renderTabs={() => {
          return <FilmDetailTabs
            handleTabClick={(activeTab) => {
              this.setState({
                activeFilmDetailPage: activeTab
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
