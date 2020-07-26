import React, {PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {filmShape} from '../../utils/shapes.js';
import {FILM_CARD_DEFAULT} from '../../utils/const.js';

import Main from '../main/main.jsx';
import FilmDetails from '../film-details/film-details.jsx';

import {withTabs} from '../../hocs/with-tabs.jsx';

const FilmDetailsWithTabs = withTabs(FilmDetails);

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      film: FILM_CARD_DEFAULT
    };

    this._handleFilmClick = this._handleFilmClick.bind(this);
  }

  render() {
    const {films} = this.props;
    const filmCard = films[0];

    return <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          {this._renderApp()}
        </Route>
        <Route exct path='/dev-film-detail'>
          <FilmDetailsWithTabs
            films={films}
            film={filmCard}
            handleFilmClick={this._handleFilmClick}
          />
        </Route>
      </Switch>
    </BrowserRouter>;
  }

  _renderApp() {
    const {films, filmName, genre, date} = this.props;
    const {film} = this.state;

    if (film.id === null) {
      return (
        <Main
          films={films}
          filmName={filmName}
          genre={genre}
          date={date}
          handleFilmClick={this._handleFilmClick}
        />
      );
    } else {
      return <FilmDetailsWithTabs
        films={films}
        film={film}
        handleFilmClick={this._handleFilmClick}
      />;
    }
  }

  _handleFilmClick(film) {
    this.setState({film});
  }
}

App.propTypes = {
  date: PropTypes.number.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape(filmShape)
  ),
  filmName: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
};
