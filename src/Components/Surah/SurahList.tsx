import React, {useState} from 'react';
import {
  FlatList,
  Text,
  Pressable,
  View,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {surahs} from '../../../resources/Surahs/surahs';
import Search from './Search';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const scaleFont = size => {
  const scale = SCREEN_WIDTH / 375; // 375 is a reference width (iPhone 6/7/8)
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const SurahList = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSurahs = surahs.filter(
    item =>
      item.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.includes(searchTerm),
  );

  return (
    <>
      <Search onSearch={setSearchTerm} />
      <FlatList
        data={filteredSurahs}
        keyExtractor={(item, index) => item.id + '-' + index}
        contentContainerStyle={styles.content}
        maxToRenderPerBatch={20}
        updateCellsBatchingPeriod={50}
        renderItem={({item}) => (
          <Pressable
            android_ripple={{color: 'transparent'}}
            onPress={() => navigation.navigate('SurahPage', {item})}>
            <View style={styles.surahCard}>
              <View style={styles.surahNumberContainer}>
                <Text style={styles.surahNumber}>{item.id}</Text>
              </View>
              <View style={styles.surahInfo}>
                <View style={styles.rowBetween}>
                  <View style={styles.leftText}>
                    <Text style={styles.surahTitle}>
                      {item.transliteration}
                    </Text>
                  </View>
                  <View style={styles.centeredText}>
                    <Text style={styles.surahArabic}>{item.name}</Text>
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
    width: 40,
    height: 40,
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
    fontSize: scaleFont(13),
  },
  surahInfo: {
    flex: 1,
    marginLeft: 20,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // changed from flex-start to center
  },
  leftText: {
    flex: 1,
  },
  centeredText: {
    flex: 1,
    alignItems: 'center',
  },
  rightText: {
    alignItems: 'flex-end',
  },
  surahTitle: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  surahArabic: {
    fontSize: scaleFont(20),
    color: '#1A1A1A',
    fontWeight: '700',
  },
  surahAyahCount: {
    marginTop: 4,
    fontSize: scaleFont(15),
    color: '#2c3e50',
  },
});

export default SurahList;
