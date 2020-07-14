import {generateFilm, generateFilms} from '../mocks/films.js';

const FILMS_NUMBER = 10;

const film = generateFilm(1);
const films = generateFilms(FILMS_NUMBER);

export {film, films};
