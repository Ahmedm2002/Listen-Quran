import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import TrackPlayer, {
  useProgress,
  State,
  RepeatMode,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import {useFocusEffect} from '@react-navigation/native';
import usePlaybackStatus from '../../Hooks/UsePlayBack';
import DurationContainer from './DurationContainer';

const {width} = Dimensions.get('window');

const ControlCenter = ({audioToPlay}: {audioToPlay: any}) => {
  const playbackState = usePlaybackStatus();
  const {position, duration} = useProgress();
  const [isReady, setIsReady] = useState(false);

  const SliderComp: any = Slider;

  const setup = async () => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: `${audioToPlay.id}`,
        url: audioToPlay.url,
        title: audioToPlay.name,
        artist: 'Qari',
      });

      await TrackPlayer.setRepeatMode(RepeatMode.Track);
      await TrackPlayer.play();
      setIsReady(true);
    } catch (error) {
      console.error('Error initializing track:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setup();

      return () => {
        TrackPlayer.stop();
        TrackPlayer.reset();
      };
    }, [audioToPlay.id]),
  );

  const togglePlayback = async () => {
    try {
      const {state} = await TrackPlayer.getPlaybackState();

      if (
        state === State.Ready ||
        state === State.Paused ||
        state === State.Stopped
      ) {
        await TrackPlayer.play();
      } else if (state === State.Playing) {
        await TrackPlayer.pause();
      }
    } catch (error) {
      console.error('Playback toggle error:', error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {isReady ? (
          <>
            <Text style={styles.title}>{audioToPlay?.name}</Text>

            <SliderComp
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              minimumTrackTintColor="#22c55e"
              maximumTrackTintColor="#555"
              thumbTintColor="#22c55e"
              onSlidingComplete={async (value: number) => {
                try {
                  await TrackPlayer.seekTo(value);
                } catch (err) {
                  console.error('Seek error:', err);
                }
              }}
            />

            <DurationContainer position={position} duration={duration} />

            <Pressable style={styles.button} onPress={togglePlayback}>
              {playbackState === State.Loading ||
              playbackState === State.Buffering ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <Icon
                  name={
                    playbackState === State.Playing ? 'pause' : 'play-arrow'
                  }
                  size={36}
                  color="#fff"
                />
              )}
            </Pressable>
          </>
        ) : (
          <ActivityIndicator size="large" color="#22c55e" />
        )}
      </View>
    </View>
  );
};

export default ControlCenter;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: '#101010',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  button: {
    backgroundColor: '#22c55e',
    borderRadius: 40,
    padding: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
