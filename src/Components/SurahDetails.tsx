import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import SoundPlayer from 'react-native-sound-player';

const SurahDetails = ({surah}: {surah: any}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    return () => {
      SoundPlayer.stop();
    };
  }, []);

  const playSound = () => {
    try {
      SoundPlayer.playAsset(require('../audioFiles/1.mp3'));
      setIsPlaying(true);
      setIsPaused(false);
    } catch (e) {
      console.log('Cannot play the sound file', e);
    }
  };

  const pauseSound = () => {
    try {
      SoundPlayer.pause();
      setIsPaused(true);
      setIsPlaying(false);
    } catch (e) {
      console.log('Cannot pause the sound', e);
    }
  };

  const resumeSound = () => {
    try {
      SoundPlayer.resume();
      setIsPlaying(true);
      setIsPaused(false);
    } catch (e) {
      console.log('Cannot resume the sound', e);
    }
  };

  const stopSound = () => {
    try {
      SoundPlayer.stop();
      setIsPlaying(false);
      setIsPaused(false);
    } catch (e) {
      console.log('Cannot stop the sound', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{surah.name}</Text>
      <Text style={styles.titleAr}>{surah.transliteration}</Text>

      <View style={styles.metaBox}>
        <View style={styles.placeRow}>
          <Text style={styles.meta}>Place of Revelation: {surah.type}</Text>
          <Image
            source={
              surah.type === 'Mecca'
                ? require('../../assets/icons/mecca.png')
                : require('../../assets/icons/medina.png')
            }
            style={styles.placeImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.meta}>Ayahs: {surah.total_verses}</Text>
        <Text style={styles.meta}>Meaning: {surah.translation}</Text>
      </View>

      <View style={styles.controlsContainer}>
        {!isPlaying && !isPaused && (
          <TouchableOpacity style={styles.button} onPress={playSound}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
        )}

        {isPlaying && (
          <TouchableOpacity
            style={[styles.button, styles.pauseButton]}
            onPress={pauseSound}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}

        {isPaused && (
          <TouchableOpacity style={styles.button} onPress={resumeSound}>
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
        )}

        {(isPlaying || isPaused) && (
          <TouchableOpacity
            style={[styles.button, styles.stopButton]}
            onPress={stopSound}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f1f8e9',
    borderRadius: 16,
    paddingVertical: 20,
    shadowColor: '#2e7d32',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2e7d32',
    marginBottom: 6,
  },
  titleAr: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'KFGQPC Uthman Taha Naskh',
    color: '#1b5e20',
  },
  metaBox: {
    backgroundColor: '#e8f5e9',
    padding: 16,
    borderRadius: 16,
    borderColor: '#a5d6a7',
    borderWidth: 1,
    marginBottom: 24,
  },
  meta: {
    fontSize: 20,
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 8,
  },
  placeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  placeImage: {
    width: 36,
    height: 36,
    marginLeft: 12,
    marginBottom: 6,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#43a047',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    marginHorizontal: 8,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#1b5e20',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 5,
  },
  pauseButton: {
    backgroundColor: '#fbc02d',
  },
  stopButton: {
    backgroundColor: '#e53935',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
});

export default SurahDetails;
