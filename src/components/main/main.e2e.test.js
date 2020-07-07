import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

const films = [
  `Хоббит: Пустошь Смауга`,
  `Интерстеллар`,
  `Спасти рядоого Райана`,
  `Власталин колец: Возвращение короля`,
  `Хоббит: Нежданное путешествие`
];

const film = {
  name: `Интерстеллар`,
  genre: `Adventure`,
  date: 2014
};

describe(`MainComponent`, () => {
  it(`Click header films`, () => {
    const onHeaderClick = jest.fn();

    const main = shallow(
        <Main
          films={films}
          filmName={film.name}
          genre={film.genre}
          date={film.date}
          onHeaderClick={onHeaderClick}
        />
    );

    const buttonHeaders = main.find(`.small-movie-card__title`);

    buttonHeaders.forEach((buttonHeader) => {
      buttonHeader.simulate(`click`);
    });

    expect(onHeaderClick).toBeCalledTimes(buttonHeaders.length);
  });
});
