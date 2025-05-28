import React from 'react';
import {FlatList, Text, Pressable, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {juzData} from '../../../resources/Juzz/juzz';
import iJuzz from '../../Models/juzz.model';

const JuzzList = () => {
  const navigation = useNavigation();

  return (
    <>
      <FlatList
        data={juzData}
        keyExtractor={(item, index) => item.id + '-' + index}
        contentContainerStyle={styles.content}
        renderItem={({item}) => (
          <Pressable
            android_ripple={{color: 'transparent'}}
            onPress={() => {
              navigation.navigate('JuzzPage', {item});
            }}>
            <View style={styles.surahCard}>
              <View style={styles.surahNumberContainer}>
                <Text style={styles.surahNumber}>{item.id}</Text>
              </View>
              <View style={styles.surahInfo}>
                <View style={styles.rowBetween}>
                  <View style={styles.leftText}>
                    <Text style={styles.surahTitle}>{item.title}</Text>
                    <Text style={styles.surahMeaning}>{item.english}</Text>
                  </View>
                  <View style={styles.rightText}>
                    <Text style={styles.surahArabic}>{item.arabic}</Text>
                    <Text style={styles.surahAyahCount}>{item.range}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    backgroundColor: '#f0f8f5',
  },
  surahCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0ffe0',
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
  },
  surahNumberContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#AFE1AF',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '45deg'}],
    borderRadius: 10,
  },
  surahNumber: {
    color: '#1A1A1A',
    fontWeight: 'bold',
    transform: [{rotate: '-45deg'}],
    fontSize: 18,
  },
  surahInfo: {
    flex: 1,
    marginLeft: 20,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftText: {
    flex: 1,
  },
  rightText: {
    alignItems: 'flex-end',
  },
  surahTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  surahMeaning: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  surahArabic: {
    fontSize: 24,
    color: '#1A1A1A',
    fontWeight: '700',
  },
  surahAyahCount: {
    marginTop: 4,
    fontSize: 15,
    color: '#2c3e50',
  },
});

export default JuzzList;
