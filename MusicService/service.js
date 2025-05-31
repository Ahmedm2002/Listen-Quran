import TrackPlayer, {Event} from 'react-native-track-player';
export async function setUpPlayer() {
  try {
    await TrackPlayer.getActiveTrack();
    return true;
  } catch (error) {
    try {
      await TrackPlayer.setupPlayer({
        android: {
          appKilledPlaybackBehaviour:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
      });
      return true;
    } catch (setupError) {
      console.error('Setup error:', setupEror);
      return false;
    }
  }
}

export async function playBackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, () => {
    TrackPlayer.seekTo(0);
    TrackPlayer.pause();
  });
}
