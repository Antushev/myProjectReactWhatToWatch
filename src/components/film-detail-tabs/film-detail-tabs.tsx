import * as React from 'react';
import PropTypes from 'prop-types';

import {FilmDetailTabsName} from '../../utils/const.js';

const renderFilmDetailTab = (tabs, onTabClick) => {
  return Object.values(tabs).map((tab, index) => {
    return <li
      key={index}
      className="movie-nav__item"
      onClick={() => {
        onTabClick(tab);
      }}
    >
      <a href="#" className="movie-nav__link">{tab}</a>
    </li>;
  });
};

const FilmDetailTabs = (props) => {
  const {onTabClick} = props;

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {renderFilmDetailTab(FilmDetailTabsName, onTabClick)}
      </ul>
    </nav>
  );
};

FilmDetailTabs.propTypes = {
  onTabClick: PropTypes.func.isRequired
};

export default FilmDetailTabs;
