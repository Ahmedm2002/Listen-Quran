// hooks/usePlaybackStatus.ts
import {useState, useEffect} from 'react';
import TrackPlayer, {
  State,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';

function usePlaybackStatus() {
  const [playbackState, setPlaybackState] = useState<State | null>(null);

  useTrackPlayerEvents([Event.PlaybackState], async event => {
    if (event.state != null) {
      setPlaybackState(event.state);
    }
  });

  useEffect(() => {
    const getInitialState = async () => {
      const {state} = await TrackPlayer.getPlaybackState();
      setPlaybackState(state);
    };
    getInitialState();
  }, []);

  return playbackState;
}

export default usePlaybackStatus;
