import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const SurahPage = ({route}: any) => {
  const surah = route?.params?.item;

  if (!surah) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Surah data not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{surah.title}</Text>
      <Text style={styles.titleAr}>{surah.titleAr}</Text>

      <View style={styles.metaContainer}>
        <Text style={styles.metaText}>📍 Place: {surah.place}</Text>
        <Text style={styles.metaText}>📘 Type: {surah.type}</Text>
        <Text style={styles.metaText}>📄 Pages: {surah.pages}</Text>
        <Text style={styles.metaText}>🔢 Ayahs: {surah.count}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Juz Details</Text>
        {surah.juz.map((j: any, index: number) => (
          <View key={index} style={styles.juzRow}>
            <Text style={styles.juzText}>Juz {j.index}</Text>
            <Text style={styles.juzText}>
              Verses: {j.verse.start.replace('verse_', '')} –{' '}
              {j.verse.end.replace('verse_', '')}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f9f4',
    flexGrow: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
  },
  titleAr: {
    fontSize: 30,
    fontWeight: '700',
    color: '#2c6e49',
    textAlign: 'center',
    marginBottom: 20,
  },
  metaContainer: {
    marginBottom: 20,
    backgroundColor: '#e9f5ee',
    borderRadius: 10,
    padding: 16,
  },
  metaText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#34495e',
  },
  section: {
    marginTop: 10,
    backgroundColor: '#d3eedd',
    padding: 16,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  juzRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  juzText: {
    fontSize: 16,
    color: '#2c3e50',
  },
});

export default SurahPage;
