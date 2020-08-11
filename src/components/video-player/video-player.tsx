import * as React from 'react';

interface Props {
  children: React.ReactNode;
  handleVideoPlayerPlay: () => void;
  handleVideoPlayerPause: () => void;
}

const VideoPlayer: React.FunctionComponent<Props> = (props: Props) => {
  const {children, handleVideoPlayerPlay, handleVideoPlayerPause} = props;
  return (
    <div
      className="small-movie-card__image"
      onMouseOver={handleVideoPlayerPlay}
      onMouseOut={handleVideoPlayerPause}
    >
      {children}
    </div>
  );
};

export default VideoPlayer;
