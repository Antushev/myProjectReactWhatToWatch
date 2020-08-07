const FILM_CARD_DEFAULT = {
  id: 1,
  date: 2011,
  description: `dsfsdfsdf`,
  director: `sdf`,
  genre: `sdfd`,
  name: `Властелин колец: Возвращение короля`,
  backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
  posterImage: `img/dardjeeling-limited.jpg`,
  previewImage: `img/johnny-english.jpg`,
  rating: 8.4,
  scoresCount: 101323,
  starring: 2432
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
  VIDEO_BIG_SCREEN: `VIDEO_BIG_SCREEN`,
  SIGN_IN: `SIGN_IN`,
  ADD_REVIEW: `ADD_REVIEW`
};

const TypeVideoPlayer = {
  SMALL_VIDEO_PLAYER: `SMALL_VIDEO_PLAYER`,
  BIG_VIDEO_PLAYER: `BIG_VIDEO_PLAYER`
};

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

const GENRE_DEFAULT = `All genres`;

export {
  FILM_CARD_DEFAULT,
  GENRE_DEFAULT,
  FilmDetailTabsName,
  FilmsListType,
  TypeScreen,
  TypeVideoPlayer,
  AuthorizationStatus
};
