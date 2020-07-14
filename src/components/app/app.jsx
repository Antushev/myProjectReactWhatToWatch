import React, {PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {filmShape} from '../../utils/shapes.js';

import Main from '../main/main.jsx';
import FilmDetail from '../film-detail/film-detail.jsx';

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this._handleFilmClick = this._handleFilmClick.bind(this);
  }

  render() {
    const {films} = this.props;
    const film = films[0];

    return <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          {this._renderApp()}
        </Route>
        <Route exct path='/dev-film-detail'>
          <FilmDetail film={film}/>
        </Route>
      </Switch>
    </BrowserRouter>;
  }

  _renderApp() {
    const {films, filmName, genre, date} = this.props;
    const film = this.state;

    if (Object.keys(film).length === 0) {
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
      return <FilmDetail film={film} />;
    }
  }

  _handleFilmClick(film) {
    this.setState(film);
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
