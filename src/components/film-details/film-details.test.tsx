import * as React from 'react';
import {createStore, applyMiddleware} from 'redux';
import reducer from './../../reducer/reducer.js';
import * as renderer from 'react-test-renderer'
import {Router} from 'react-router-dom';
import history from './../../history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {NameSpace} from '../../reducer/name-space';

import {createApi} from '../../api';

import {film, films} from '../../mocks-test/films-t';
import {user} from '../../mocks-test/user-t';
import {comments} from '../../mocks-test/comment-t';

import {Film, UserMaximum, Comment} from './../../utils/types';
import {noop} from '../../utils/const';

import FilmDetails from './film-details';

const filmTest: Film = film;
const filmsTest: Film[] = films;
const userTest: UserMaximum = user;
const commentsTest: Comment[] = comments;

const activeTab = `overview`;

const api = createApi();

const store = createStore(
    reducer,
    {
      [NameSpace.DATA]: {
        film: null,
        films,
        id: 1
      }
    },
    applyMiddleware(thunk.withExtraArgument(api))
);

describe(`FilmDetailsComponent`, () => {
  it(`FilmDetailsComponentSnapshot`, () => {

    const match = {
      params: {
        id: 1
      }
    };

    const tree = renderer
      .create(
          <Provider store={store}>
            <Router history={history}>
              <FilmDetails
                filmDetail={filmTest}
                films={filmsTest}
                user={userTest}
                comments={commentsTest}
                match={match}
                authorizationStatus={`NO_AUTH`}
                activeTab={activeTab}
                loadComments={noop}
                renderTabs={() => null}
                onFilmClick={noop}
                onPlayClick={noop}
                onTypeScreenChange={noop}
              />
            </Router>
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
