import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const SurahPage = ({route}: any) => {
  const surah = route?.params?.item;
  const surahNumber = surah?.index;

  const [ayahs, setAyahs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getSurahText = async () => {
    try {
      const response = await axios.get(
        `http://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`,
      );
      setAyahs(response.data.data.ayahs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSurahText();
  }, []);

  if (!surah) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: Surah data not found</Text>
      </View>
    );
  }

  const isBismillahRequired = !['At-Tawbah', 'التوبة'].includes(surah.title);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{surah.title}</Text>
      <Text style={styles.titleAr}>{surah.titleAr}</Text>

      <View style={styles.metaBox}>
        <Text style={styles.meta}>📍 {surah.place}</Text>
        <Text style={styles.meta}>🔢 Ayahs: {surah.count}</Text>
        <Text style={styles.meta}>📝 Meaning: {surah.translatedName}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2e7d32" />
      ) : (
        <View style={styles.ayahContainer}>
          {isBismillahRequired && surahNumber !== 1 && (
            <Text style={styles.bismillah}>﷽</Text>
          )}
          {ayahs.map((ayah, index) => (
            <View key={index} style={styles.ayahBox}>
              <Text style={styles.ayahText}>{ayah.text}</Text>
              <Text style={styles.ayahNumber}>﴿{ayah.numberInSurah}﴾</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#f9fdf9',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fdf9',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2e7d32', // deep green
    marginBottom: 4,
  },
  titleAr: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'KFGQPC Uthman Taha Naskh',
    color: '#1b5e20', // darker green
  },
  metaBox: {
    backgroundColor: '#e8f5e9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    borderColor: '#a5d6a7',
    borderWidth: 1,
  },
  meta: {
    fontSize: 15,
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 4,
  },
  bismillah: {
    fontSize: 34,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'KFGQPC Uthman Taha Naskh',
    color: '#388e3c',
  },
  ayahContainer: {
    paddingBottom: 40,
  },
  ayahBox: {
    marginBottom: 28,
    paddingHorizontal: 6,
  },
  ayahText: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'KFGQPC Uthman Taha Naskh',
    lineHeight: 44,
    color: '#212121', // dark text for light background
  },
  ayahNumber: {
    textAlign: 'center',
    fontSize: 18,
    color: '#4caf50',
    marginTop: 8,
  },
});

export default SurahPage;
