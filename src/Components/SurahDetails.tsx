// SurahDetails.tsx
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MeccaImg from '../../assets/icons/mecca.png';
import MadinaImg from '../../assets/icons/medina.png';

const SurahDetails = ({surah}: {surah: any}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{surah.title}</Text>
      <Text style={styles.titleAr}>{surah.titleAr}</Text>

      <View style={styles.metaBox}>
        <View style={styles.placeRow}>
          <Text style={styles.meta}>Place of Revelation: {surah.place}</Text>
          <Image
            source={surah.place === 'Mecca' ? MeccaImg : MadinaImg}
            style={styles.placeImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.meta}>Ayahs: {surah.count}</Text>
        <Text style={styles.meta}>Meaning: {surah.translatedName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
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
});

export default SurahDetails;
