import React, {useEffect, useState} from 'react';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
  State,
} from 'react-native-track-player';

function usePlaybackStatus() {
  const [playBackState, setPlaybackState] = useState<State | null>(null);

  useTrackPlayerEvents([Event.PlaybackState], async event => {
    if (event !== null) {
      setPlaybackState(event.state);
    }
  });

  async function getInitialState() {
    const {state} = await TrackPlayer.getPlaybackState();
    setPlaybackState(state);
  }

  useEffect(() => {
    getInitialState();
  }, []);
  return playBackState;
}

export default usePlaybackStatus;

// import {useState, useEffect} from 'react';
// import TrackPlayer, {
//   State,
//   Event,
//   useTrackPlayerEvents,
// } from 'react-native-track-player';

// function usePlaybackStatus() {
//   const [playbackState, setPlaybackState] = useState<State | null>(null);

//   useTrackPlayerEvents([Event.PlaybackState], async event => {
//     if (event.state != null) {
//       setPlaybackState(event.state);
//     }
//   });

//   useEffect(() => {
//     const getInitialState = async () => {
//       const {state} = await TrackPlayer.getPlaybackState();
//       setPlaybackState(state);
//     };
//     getInitialState();
//   }, []);

//   return playbackState;
// }

// export default usePlaybackStatus;
