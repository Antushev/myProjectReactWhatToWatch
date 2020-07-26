import React from 'react';
import PropTypes from 'prop-types';

import {FilmDetailTabsName} from '../../utils/const.js';

const renderFilmDetailTab = (tabs, handleTabsClick) => {
  return Object.values(tabs).map((tab, index) => {
    return <li
      key={index}
      className="movie-nav__item"
      onClick={() => {
        handleTabsClick(tab);
      }}
    >
      <a href="#" className="movie-nav__link">{tab}</a>
    </li>;
  });
};

const FilmDetailTabs = (props) => {
  const {handleTabClick} = props;

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {renderFilmDetailTab(FilmDetailTabsName, handleTabClick)}
      </ul>
    </nav>
  );
};

FilmDetailTabs.propTypes = {
  handleTabClick: PropTypes.func.isRequired
};

export default FilmDetailTabs;
