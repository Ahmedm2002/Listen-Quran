import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import ControlCenter from '../Player/ControlCenter';
import {surahAudioMap} from '../../Constants/surahAudioMap';
import iSurah from '../../Models/surah.model';

const SurahDetails = ({surah}: {surah: iSurah}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.title}>{surah.name}</Text>
          <Text style={styles.titleAr}>{surah.transliteration}</Text>

          <View style={styles.metaBox}>
            <View style={styles.placeRow}>
              <Text style={styles.meta}>Place of Revelation: {surah.type}</Text>
              <Image
                source={
                  surah.type === 'Mecca'
                    ? require('../../../assets/icons/mecca.png')
                    : require('../../../assets/icons/medina.png')
                }
                style={styles.placeImage}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.meta}>Ayahs: {surah.total_verses}</Text>
            <Text style={styles.meta}>Meaning: {surah.translation}</Text>
          </View>
        </View>
      </ScrollView>

      <ControlCenter
        audioToPlay={{
          ...surah,
          url: surahAudioMap[surah.id],
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f8e9',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 140,
  },
  container: {
    backgroundColor: '#f1f8e9',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
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
});

export default SurahDetails;
