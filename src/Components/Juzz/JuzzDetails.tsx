import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

const JuzzDetails = ({juzz}) => {
  if (!juzz) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Juzz data not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{juzz.title}</Text>
        <Text style={styles.arabic}>{juzz.arabic}</Text>
        <Text style={styles.english}>{juzz.english}</Text>
        <View style={styles.rangeBox}>
          <Text style={styles.rangeText}>Verses: {juzz.range}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f8f5',
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#e0ffe0',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 16,
  },
  arabic: {
    fontSize: 34,
    fontFamily: 'KFGQPC Uthman Taha Naskh',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 48,
  },
  english: {
    fontSize: 20,
    color: '#388e3c',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
  rangeBox: {
    marginTop: 18,
    backgroundColor: '#d4f5d4',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  rangeText: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8f5',
  },
  error: {
    fontSize: 18,
    color: '#e53935',
    fontWeight: 'bold',
  },
});

export default JuzzDetails;
