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
import iSurah from '../../Models/surah.model';
import iJuzz from '../../Models/juzz.model';

const {width} = Dimensions.get('window');

type AudioFile = iSurah | iJuzz;

const ControlCenter = ({audioToPlay}: {audioToPlay: AudioFile}) => {
  const playbackState = usePlaybackStatus();
  const {position, duration} = useProgress();
  const [isReady, setIsReady] = useState(false);
  const [isFavorite, setIsFavourite] = useState<boolean>(false);
  const [speed, setSpeed] = useState(1.0);

  function toggleFavorite() {
    setIsFavourite(prev => !prev);
  }

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
    }, [audioToPlay?.id]),
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

  const handleSpeedPress = async () => {
    const speeds = [1.0, 1.25, 1.5, 1.75, 2.0];
    const currentIndex = speeds.indexOf(speed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];

    try {
      await TrackPlayer.setRate(newSpeed);
      setSpeed(newSpeed);
    } catch (error) {
      console.error('Speed change error:', error);
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

            <View style={styles.controlsRow}>
              <Pressable style={styles.speedButton} onPress={handleSpeedPress}>
                <Text style={styles.speedText}>{speed}x</Text>
              </Pressable>

              <Icon
                name="skip-previous"
                size={40}
                color="#666"
                style={styles.icon}
              />

              <Pressable style={styles.playButton} onPress={togglePlayback}>
                {playbackState === State.Loading ||
                playbackState === State.Buffering ? (
                  <ActivityIndicator size={30} color="#fff" />
                ) : (
                  <Icon
                    name={
                      playbackState === State.Playing ? 'pause' : 'play-arrow'
                    }
                    size={40}
                    color="#fff"
                  />
                )}
              </Pressable>

              <Icon
                name="skip-next"
                size={40}
                color="#666"
                style={styles.icon}
              />

              <Pressable onPress={toggleFavorite}>
                <Icon
                  name="favorite"
                  size={30}
                  color={isFavorite ? 'red' : '#fff'}
                  style={styles.icon}
                />
              </Pressable>
            </View>

            {/* Speed Control */}
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
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
  icon: {
    paddingHorizontal: 10,
  },
  playButton: {
    backgroundColor: '#16a34a',
    borderRadius: 50,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#16a34a',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  speedButton: {
    backgroundColor: '#16a34a',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  speedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
