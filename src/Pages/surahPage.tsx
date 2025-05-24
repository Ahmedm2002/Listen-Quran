import React from 'react';
import {View, StyleSheet} from 'react-native';
import SurahDetails from '../Components/SurahDetails';

const SurahPage = ({route}: any) => {
  const surah = route?.params?.item;

  return (
    <View style={styles.container}>
      <SurahDetails surah={surah} />
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
