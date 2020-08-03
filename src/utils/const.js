const FILM_CARD_DEFAULT = {
  id: null,
  date: null,
  description: null,
  director: null,
  genre: null,
  name: null,
  backgroundImage: null,
  posterImage: null,
  previewImage: null,
  rating: null,
  scoresCount: null,
  starring: null
};

const FilmDetailTabsName = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`
};

const FilmsListType = {
  DEFAULT: `default`,
  MORE_LIKE: `more like`
};

const TypeScreen = {
  MAIN_SCREEN: `MAIN_SCREEN`,
  DETAIL_SCREEN: `DETAIL_SCREEN`,
  VIDEO_BIG_SCREEN: `VIDEO_BIG_SCREEN`
};

const TypeVideoPlayer = {
  SMALL_VIDEO_PLAYER: `SMALL_VIDEO_PLAYER`,
  BIG_VIDEO_PLAYER: `BIG_VIDEO_PLAYER`
};

export {
  FILM_CARD_DEFAULT,
  FilmDetailTabsName,
  FilmsListType,
  TypeScreen,
  TypeVideoPlayer
};
