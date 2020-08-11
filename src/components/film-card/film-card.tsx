import * as React from 'react';
import {Link} from 'react-router-dom';

import {AppRoute} from '../../utils/const';
import {Film} from '../../utils/types';

interface Props {
  film: Film,
  renderVideoPlayer: (posterImage: string, previewVideo: string, videoMain:string) => React.ReactNode,
}

const FilmCard: React.FunctionComponent<Props> = (props: Props) => {
  const {film, renderVideoPlayer} = props;
  const {id, name, posterImage, previewVideo, videoMain} = film;

  return (
    <article
      key={id}
      className="small-movie-card catalog__movies-card"
    >
      <Link to={`${AppRoute.FILMS}/${id}`}>
        {renderVideoPlayer(posterImage, previewVideo, videoMain)}
      </Link>
      <h3 className="small-movie-card__title">
        <Link to={`${AppRoute.FILMS}/${id}`} className="small-movie-card__link">{name}</Link>
      </h3>
    </article>
  );
};

export default FilmCard;
