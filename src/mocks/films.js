import {getRandomNumber, getRandomElementFromArray, getRandomNumberFloat} from '../utils/common.js';

const MIN_YEAR_DATE = 1985;
const MAX_YEAR_DATE = 2020;
const MIN_RATING = 0;
const MAX_RATING = 10;
const MIN_SCORES = 5;
const MAX_SCORES = 100000;
const MIN_RUNTIME = 100;
const MAX_RUNTIME = 300;

const names = [
  `Хоббит: Пустош Смауга`,
  `Интерстеллар`,
  `Спасти рядового Райана`,
  `Властелин колец: Возвращение короля`,
  `Хоббит: Нежданное путешествие`,
  `Джанго: Освобожденный`,
  `Автостопом по галактике`,
  `Мы легенды`
];

const previewImages = [
  `aviator.jpg`,
  `bohemian-rhapsody.jpg`,
  `johnny-english.jpg`,
  `macbeth.jpg`
];

const previewVideo = [
  `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
];

const posters = [
  `aviator.jpg`,
  `bohemian-rhapsody.jpg`,
  `johnny-english.jpg`,
  `macbeth.jpg`
];

const backgroundImage = [
  `bg-the-grand-budapest-hotel.jpg`,
  `player-poster.jpg`
];

const directors = [
  `Джон`,
  `Никита`,
  `Казимир`,
  `Леонтий`
];

const genres = [
  `Comedy`,
  `Adventure`,
  `Action`,
  `Drama`,
  `Thriller`,
  `Detective`,
  `Horror`,
  `Sport`,
  `Western`,
  `Crime`,
  `Fantastic`,
];

const generateFilm = (idFilm) => {
  return {
    id: idFilm,
    date: getRandomNumber(MIN_YEAR_DATE, MAX_YEAR_DATE),
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.
                  Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: getRandomElementFromArray(directors),
    genre: getRandomElementFromArray(genres),
    name: getRandomElementFromArray(names),
    backgroundImage: getRandomElementFromArray(backgroundImage),
    posterImage: getRandomElementFromArray(previewImages),
    previewImage: getRandomElementFromArray(posters),
    previewVideo: getRandomElementFromArray(previewVideo),
    videoMain: getRandomElementFromArray(previewVideo),
    rating: getRandomNumberFloat(MIN_RATING, MAX_RATING),
    scoresCount: getRandomNumber(MIN_SCORES, MAX_SCORES),
    runtime: getRandomNumber(MIN_RUNTIME, MAX_RUNTIME),
    starring: [`Гоша`, `Щас Зе Енд`, `Куллер`, `Райан Оркестр`],
  };
};

const generateFilms = (filmsCount) => {
  return new Array(filmsCount).fill(``)
    .map((film, index) => {
      return generateFilm(index);
    });
};

export {generateFilm, generateFilms};
