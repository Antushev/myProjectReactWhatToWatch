import React, {PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {filmShape} from '../../utils/shapes.js';
import {FILM_CARD_DEFAULT} from '../../utils/const.js';

import Main from '../main/main.jsx';
import FilmDetails from '../film-details/film-details.jsx';

import {withTabs} from '../../hocs/with-tabs.jsx';

const FilmDetailsWithTabs = withTabs(FilmDetails);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      film: FILM_CARD_DEFAULT
    };

    this._handleFilmClick = this._handleFilmClick.bind(this);
  }

  render() {
    const {currentFilms} = this.props;
    const filmCard = currentFilms[0];

    return <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          {this._renderApp()}
        </Route>
        <Route exct path='/dev-film-detail'>
          <FilmDetailsWithTabs
            films={currentFilms}
            film={filmCard}
            handleFilmClick={this._handleFilmClick}
          />
        </Route>
      </Switch>
    </BrowserRouter>;
  }

  _renderApp() {
    const {
      films,
      currentFilms,
      currentGenre,
    } = this.props;
    const {film} = this.state;

    const filmCard = currentFilms[0];

    if (film.id === null) {
      return (
        <Main
          films={films}
          currentFilms={currentFilms}
          currentGenre={currentGenre}
          filmName={filmCard.name}
          genre={filmCard.genre}
          date={filmCard.date}
          handleFilmClick={this._handleFilmClick}
        />
      );
    } else {
      return <FilmDetailsWithTabs
        films={currentFilms}
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
  films: PropTypes.arrayOf(
      PropTypes.shape(filmShape)
  ),
  currentFilms: PropTypes.arrayOf(
      PropTypes.shape(filmShape)
  ),
  currentGenre: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films,
  currentFilms: state.currentFilms,
  currentGenre: state.currentGenre
});

export {App};
export default connect(mapStateToProps, null)(App);
