import * as React from 'react';
import {connect} from 'react-redux';

import {getFilms} from './../../reducer/data/selectors';

import {Film} from '../../utils/types';

interface Props {
  films: Film[];
  activeItem: string;
  onActiveItemChange: (genre: string) => void;
  onGenreTabClick: (genre: string) => void;
}

const getGenresFilms = (films) => {
  const genres = [`All genres`];

  films.forEach((film) => {
    const isFilmInArray = genres.find((genre) => {
      return film.genre === genre;
    });

    if (isFilmInArray === undefined) {
      genres.push(film.genre);
    }
  });

  return genres;
};

const MAX_GENRES = 9;

const renderGenre = (genre, currentGenre, onActiveItemChange, onGenreTabClick) => {
  return (
    <li
      key={genre}
      className={`catalog__genres-item ${genre === currentGenre ? `catalog__genres-item--active` : ``}`}
      onClick={() => {
        onActiveItemChange(genre);
        onGenreTabClick(genre);
      }}
    >
      <a href="#" className="catalog__genres-link">{genre}</a>
    </li>
  );
};

const renderGenres = (genres, currentGenre, onActiveItemChange, onGenreTabClick) => {
  return genres.map((genre) => {
    return renderGenre(genre, currentGenre, onActiveItemChange, onGenreTabClick);
  }).slice(0, MAX_GENRES);
};

const GenresList: React.FunctionComponent<Props> = (props: Props) => {
  const {films, activeItem, onActiveItemChange, onGenreTabClick} = props;

  const genres = getGenresFilms(films);

  return (
    <ul className="catalog__genres-list">
      {renderGenres(genres, activeItem, onActiveItemChange, onGenreTabClick)}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    films: getFilms(state)
  };
};

export {GenresList};
export default connect(mapStateToProps, null)(GenresList);

