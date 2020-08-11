import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import history from './../../history';

import {Film, UserMaximum} from '../../utils/types';

import {NameSpace} from '../../reducer/name-space';
import {film} from '../../mocks-test/films-t';
import {user} from '../../mocks-test/user-t';

import {AddReview} from './add-review';

const filmTest: Film = film;
const userTest: UserMaximum = user;

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    isLoadingComment: false
  }
});

describe(`AddReviewComponent`, () => {
  it(`AddReviewComponentSnapshot with NO_AUTH user`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <AddReview
                film={filmTest}
                user={userTest}
                authorizationStatus={`NO_AUTH`}
              />
            </Provider>
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`AddReviewComponentSnapshot with AUTH user`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <AddReview
                film={film}
                user={user}
                authorizationStatus={`AUTH`}
              />
            </Provider>
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
