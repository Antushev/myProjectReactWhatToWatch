import * as React from 'react';

import {FilmDetailTabsName} from '../../utils/const';

interface Props {
  onTabClick: (tab: string) => void
}

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

const FilmDetailTabs: React.FunctionComponent<Props> = (props: Props) => {
  const {onTabClick} = props;

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {renderFilmDetailTab(FilmDetailTabsName, onTabClick)}
      </ul>
    </nav>
  );
};

export default FilmDetailTabs;
