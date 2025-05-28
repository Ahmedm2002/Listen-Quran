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
  Event,
  RepeatMode,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import {useFocusEffect} from '@react-navigation/native';
import usePlaybackStatus from '../../Hooks/UsePlayBack';
import DurationContainer from './DurationContainer';
import iSurah from '../../Models/surah.model';
import iJuzz from '../../Models/juzz.model';

const {width} = Dimensions.get('window');

type AudioFile = iSurah | iJuzz;

const ControlCenter = ({audioToPlay}: {audioToPlay: AudioFile}) => {
  const playbackState = usePlaybackStatus();
  const {position, duration} = useProgress();
  const [isReady, setIsReady] = useState(false);

  const SliderComp: any = Slider;

  const setup = async () => {
    if (!audioToPlay.url) {
      console.log('Audio url missing');
      throw new Error('Missing required audio fields');
    }
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: `${audioToPlay.id}`,
        url: audioToPlay?.url,
        title: audioToPlay?.name,
        artist: 'Qari',
      });
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
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
      if ([State.Ready, State.Paused, State.Stopped].includes(state)) {
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
            <Text style={styles.title} numberOfLines={1}>
              {audioToPlay?.name}
            </Text>

            <SliderComp
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              minimumTrackTintColor="#16a34a"
              maximumTrackTintColor="#444"
              thumbTintColor="#16a34a"
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
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Icon
                  name={
                    playbackState === State.Playing ? 'pause' : 'play-arrow'
                  }
                  size={30}
                  color="#fff"
                />
              )}
            </Pressable>
          </>
        ) : (
          <ActivityIndicator size="large" color="#16a34a" />
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
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -6},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 12,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
    maxWidth: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 6,
  },
  button: {
    backgroundColor: '#16a34a',
    borderRadius: 100,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#16a34a',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
});
