import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';

// Map Surah IDs to required audio files
const audioMap: {[key: string]: any} = {
  1: require('../audioFiles/1.mp3'),
  2: require('../audioFiles/2.mp3'),
  // Add more mappings as needed
};

const SurahDetails = ({surah}: {surah: any}) => {
  const soundRef = (useRef < Sound) | (null > null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    Sound.setCategory('Playback');

    const audioFile = audioMap[surah.id]; // Use surah.id like '1', '2', etc.

    if (!audioFile) {
      console.log('No audio file found for this Surah.');
      return;
    }

    const sound = new Sound(audioFile, error => {
      if (error) {
        console.log('Failed to load the sound', error);
      } else {
        sound.setVolume(volume);
      }
    });

    soundRef.current = sound;

    return () => {
      sound.release();
    };
  }, [surah.id]); // Re-run effect if surah changes

  const togglePlayback = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play(success => {
        if (success) {
          console.log('Playback finished');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
        setIsPlaying(false);
      });
    }

    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (val: number) => {
    setVolume(val);
    soundRef.current?.setVolume(val);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{surah.title}</Text>
      <Text style={styles.titleAr}>{surah.titleAr}</Text>

      <View style={styles.metaBox}>
        <View style={styles.placeRow}>
          <Text style={styles.meta}>Place of Revelation: {surah.place}</Text>
          <Image
            source={{
              uri:
                surah.place === 'Mecca'
                  ? 'https://img.icons8.com/emoji/48/kaaba-emoji.png'
                  : 'https://img.icons8.com/emoji/48/mosque-emoji.png',
            }}
            style={styles.placeImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.meta}>Ayahs: {surah.count}</Text>
        <Text style={styles.meta}>Meaning: {surah.translatedName}</Text>

        <View style={styles.controls}>
          <TouchableOpacity onPress={togglePlayback} style={styles.playBtn}>
            <Image
              source={{
                uri: isPlaying
                  ? 'https://img.icons8.com/ios-filled/50/pause--v1.png'
                  : 'https://img.icons8.com/ios-filled/50/play--v1.png',
              }}
              style={styles.icon}
            />
          </TouchableOpacity>

          <View style={styles.sliderBox}>
            <Text style={styles.volumeLabel}>Volume</Text>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={1}
              value={volume}
              onValueChange={handleVolumeChange}
              minimumTrackTintColor="#4caf50"
              maximumTrackTintColor="#a5d6a7"
              thumbTintColor="#2e7d32"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2e7d32',
    marginBottom: 4,
  },
  titleAr: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'KFGQPC Uthman Taha Naskh',
    color: '#1b5e20',
  },
  metaBox: {
    backgroundColor: '#e8f5e9',
    padding: 12,
    borderRadius: 12,
    borderColor: '#a5d6a7',
    borderWidth: 1,
  },
  meta: {
    fontSize: 20,
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 4,
  },
  placeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  placeImage: {
    width: 30,
    height: 30,
    marginLeft: 8,
    marginBottom: 6,
  },
  controls: {
    marginTop: 16,
    alignItems: 'center',
  },
  playBtn: {
    backgroundColor: '#a5d6a7',
    padding: 12,
    borderRadius: 50,
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#2e7d32',
  },
  sliderBox: {
    alignItems: 'center',
  },
  volumeLabel: {
    fontSize: 16,
    color: '#2e7d32',
    marginBottom: 4,
  },
});

export default SurahDetails;
