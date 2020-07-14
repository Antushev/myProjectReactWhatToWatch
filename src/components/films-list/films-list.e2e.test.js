import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilmsList from './films-list.jsx';

import {films} from '../../mocks-test/films-test.js';

configure({adapter: new Adapter()});

describe(`FilmsListComponent`, () => {
  it(`Click header films`, () => {
    const handleHeaderClick = jest.fn();

    const filmsList = shallow(
        <FilmsList
          films={films}
          handleHeaderClick={handleHeaderClick}
        />
    );

    const buttonHeaders = filmsList.find(`.small-movie-card__title`);

    buttonHeaders.forEach((buttonHeader) => {
      buttonHeader.simulate(`click`);
    });

    expect(handleHeaderClick).toBeCalledTimes(buttonHeaders.length);
  });
});
