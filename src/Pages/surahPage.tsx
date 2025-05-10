import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import SurahDetails from '../Components/SurahDetails';

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
      console.log('Response of Api: ', response.data);
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
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#2e7d32" />
      ) : (
        <>
          <SurahDetails surah={surah} />

          <FlatList
            data={ayahs}
            keyExtractor={item => item.number.toString()}
            renderItem={({item}) => (
              <View style={styles.ayahBox}>
                <Text style={styles.ayahText}>{item.text}</Text>
                <Text style={styles.ayahNumber}>﴿{item.numberInSurah}﴾</Text>
              </View>
            )}
            contentContainerStyle={{paddingBottom: 60}}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
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
  bismillah: {
    fontSize: 34,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'KFGQPC Uthman Taha Naskh',
    color: '#388e3c',
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
    color: '#212121',
  },
  ayahNumber: {
    textAlign: 'center',
    fontSize: 18,
    color: '#4caf50',
    marginTop: 8,
  },
});

export default SurahPage;
