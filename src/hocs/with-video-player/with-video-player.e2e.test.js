import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {withVideoPlayer} from './with-video-player.jsx';

configure({adapter: new Adapter()});

const MockComponent = <div></div>;
const MockComponentWrapped = withVideoPlayer(MockComponent);

describe(`Tests HOC with-video-player`, () => {
  it(`Test HOC with-video-player`, () => {
    const wrapper = shallow(<MockComponentWrapped />);

    expect(wrapper.state().isPlaying).toEqual(false);
  });
});

