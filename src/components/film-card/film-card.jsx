import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {filmShape} from '../../utils/shapes.js';

import VideoPlayer from '../video-player/video-player.jsx';

export default class FilmCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };

    this._handleFilmCardMouseOver = this._handleFilmCardMouseOver.bind(this);
    this._handleFilmCardMouseOut = this._handleFilmCardMouseOut.bind(this);
  }

  render() {
    const {film, handleFilmClick, handleFilmCardMouseOver} = this.props;
    const {isPlaying} = this.state;
    const {id, name, posterImage, previewVideo} = film;

    return (
      <article
        key={id}
        className="small-movie-card catalog__movies-card"
        onMouseOver={() => handleFilmCardMouseOver(film)}
        onClick={() => handleFilmClick(film)}
      >
        <VideoPlayer
          isPlaying={isPlaying}
          posterImage={posterImage}
          previewVideo={previewVideo}
          handleFilmCardMouseOver={this._handleFilmCardMouseOver}
          handleFilmCardMouseOut={this._handleFilmCardMouseOut}
        />
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{name}</a>
        </h3>
      </article>
    );
  }

  _handleFilmCardMouseOver() {
    this.setState((prevState) => {
      return {isPlaying: !prevState.isPlaying};
    });
  }

  _handleFilmCardMouseOut() {
    this.setState((prevState) => {
      return {isPlaying: !prevState.isPlaying};
    });
  }
}


FilmCard.propTypes = {
  film: PropTypes.shape(filmShape).isRequired,
  handleFilmClick: PropTypes.func.isRequired,
  handleFilmCardMouseOver: PropTypes.func.isRequired
};
