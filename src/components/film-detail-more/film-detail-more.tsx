import * as React from 'react';
import {formatDateRuntime} from '../../utils/common';

interface Props {
  film: Film;
  renderTabs: () => React.ReactNode;
}

const FilmDetailMore: React.FunctionComponent<Props> = (props: Props) => {
  const {film, renderTabs} = props;
  const {
    director,
    genre,
    name,
    posterImage,
    starring,
    runtime,
    date
  } = film;

  const runtimeFilm = formatDateRuntime(runtime);

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <div className="movie-card__poster movie-card__poster--big">
          <img src={posterImage} alt={name} width="218"
            height="327"/>
        </div>

        <div className="movie-card__desc">
          {renderTabs()}

          <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Director</strong>
                <span className="movie-card__details-value">{director}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Starring</strong>
                <span className="movie-card__details-value">
                  {starring.join(`, \n`)}
                </span>
              </p>
            </div>

            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">{runtimeFilm}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">{genre}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">{date}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetailMore;
