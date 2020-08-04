const filmAdapter = (film) => {
  return {
    id: film[`id`],
    date: film[`released`],
    description: film[`description`],
    director: film[`director`],
    genre: film[`genre`],
    name: film[`name`],
    backgroundImage: film[`background_image`],
    backgroundColor: film[`background_color`],
    posterImage: film[`poster_image`],
    previewImage: film[`preview_image`],
    previewVideo: film[`preview_video_link`],
    videoMain: film[`video_link`],
    rating: film[`rating`],
    scoresCount: film[`scores_count`],
    runtime: film[`run_time`],
    starring: film[`starring`],
    isFavorite: film[`is_favorite`]
  };
};

const filmsAdapter = (films) => {
  return films.map((film) => {
    return filmAdapter(film);
  });
};

export {filmAdapter, filmsAdapter};
