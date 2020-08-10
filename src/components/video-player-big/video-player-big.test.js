import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import history from './../../history.js';

import {NameSpace} from './../../reducer/name-space.js';

import {film, films} from './../../mocks-test/films-test.js';

import VideoPlayerBig from './video-player-big.jsx';

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
    filmActive: film,
    filmsActive: films,
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
                filmActive={film}
                posterImage={posterImage}
                videoMain={videoMain}
                videoProgress={40}
                videoTimeElapsed={40}
                match={match}
                onPlayClick={() => {}}
                onExitVideoPlayerClick={() => {}}
                onFullScreenClick={() => {}}
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
