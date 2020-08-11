import * as React from 'react';
import * as renderer from 'react-test-renderer'
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import history from './../../history';

import {NameSpace} from '../../reducer/name-space';

import {film, films} from '../../mocks-test/films-t';

import {Film} from '../../utils/types';
import {noop} from '../../utils/const';

import VideoPlayerBig from './video-player-big';

const filmTest: Film = film;
const filmsTest: Film[] = films;

const posterImage = `img/poster.jpg`;
const videoMain = `video/video-main.mp4`;

const match = {
  params: {
    id: 4
  }
};

const mockStore = configureStore([]);
const store = mockStore({
  [NameSpace.DATA]: {
    filmActive: filmTest,
    filmsActive: filmsTest,
    films,
    match
  }
});

describe(`VideoPlayerBigComponent`, () => {
  it(`VideoPlayerBigComponentSnapshot`, () => {

    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <VideoPlayerBig
                isPlaying={false}
                filmActive={filmTest}
                posterImage={posterImage}
                videoMain={videoMain}
                videoProgress={40}
                videoTimeElapsed={40}
                match={match}
                onPlayClick={noop}
                onExitVideoPlayerClick={noop}
                onFullScreenClick={noop}
              >
                <video />
              </VideoPlayerBig>
            </Provider>
          </Router>, {
            createNodeMock: () => {

            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
