import * as React from 'react';

import {FilmsListType, TypeVideoPlayer} from '../../utils/const';
import {Film} from '../../utils/types';

import {withVideoPlayer} from '../../hocs/with-video-player/with-video-player';

import FilmCard from '../film-card/film-card';

interface Props {
  films: Film[];
  showFilmCardCount: number;
  filmListType: string;
  currentFilm: Film;
}

const FILMS_MORE_LIKE_COUNT = 4;

const FilmCardWithVideoPlayer = withVideoPlayer(FilmCard, TypeVideoPlayer.SMALL_VIDEO_PLAYER);

const getFilmsMoreLike = (currentFilm, films) => {
  return films.filter((film) => {
    return film.genre === currentFilm.genre && film.name !== currentFilm.name;
  }).slice(0, FILMS_MORE_LIKE_COUNT);
};

const FilmsList: React.FunctionComponent<Props> = (props: Props) => {
  const renderFilmsList = () => {
    const {
      currentFilm,
      films,
      filmListType,
      showFilmCardCount
    } = props;

    switch (filmListType) {
      case FilmsListType.DEFAULT:
        return renderFilmsCardDefault(films, showFilmCardCount);
      case FilmsListType.MORE_LIKE:
        return renderFilmsCardMoreLike(currentFilm, films);
      default:
        return renderFilmsCardDefault(films, showFilmCardCount);
    }
  };

  const renderFilmsCardDefault = (films, showFilmCardCount) => {
    return films.map((film) => {
      return <FilmCardWithVideoPlayer
        key={film.id}
        film={film}
      />;
    }).slice(0, showFilmCardCount);
  };

  const renderFilmsCardMoreLike = (currentFilm, films) => {
    const filmsMoreLike = getFilmsMoreLike(currentFilm, films);

    return filmsMoreLike.map((film) => {
      return <FilmCardWithVideoPlayer
        key={film.id}
        film={film}
      />;
    });
  };

  return (
    <div className="catalog__movies-list">
      {renderFilmsList()}
    </div>
  );
};

export default FilmsList;
