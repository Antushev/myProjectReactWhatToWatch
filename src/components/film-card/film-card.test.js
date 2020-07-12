import React from 'react';
import renderer from 'react-test-renderer';

import FilmCard from './film-card.jsx';

const film = {
  name: `Хоббит: Пустошь Смауга`,
  picture: `img/pulp-fiction.jpg`,
  genre: `Adventure`,
  date: 2014
};

describe(`FilmCardComponent`, () => {
  it(`FilmCardComponentSnapshot`, () => {
    const tree = renderer.create(
        <FilmCard
          film={film}
          handleHeaderClick={() => {}}
          handleFilmCardMouseOver={() => {}}
        />
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
