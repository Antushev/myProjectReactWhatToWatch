import moment from 'moment';

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

const getRandomNumberFloat = (min, max) => {
  return Math.floor((Math.random() * (max - min)) * 10) / 10 + min;
};

const getRandomElementFromArray = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const formatDateRuntime = (runtimeByMinutes) => {
  const runtimeHours = moment.duration(runtimeByMinutes, `minutes`).get(`hours`);
  const runtimeMinutes = moment.duration(runtimeByMinutes, `minutes`).get(`minutes`);

  return `${runtimeHours}h ${runtimeMinutes}m`;
};

const formatVideoElapsed = (runtimeBySecond) => {
  const runtimeHours = moment.duration(runtimeBySecond, `seconds`).get(`hours`);
  const runtimeMinutes = moment.duration(runtimeBySecond, `seconds`).get(`minutes`);
  const runtimeSeconds = moment.duration(runtimeBySecond, `seconds`).get(`seconds`);

  return `${runtimeHours}:${runtimeMinutes}:${runtimeSeconds}`;
};

export {
  getRandomNumber,
  getRandomNumberFloat,
  getRandomElementFromArray,
  formatDateRuntime,
  formatVideoElapsed
};
