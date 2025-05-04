import React, {useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {surahs} from '../../resources/surahs';
import Search from './Search';

const SurahList = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSurahs = surahs.filter(
    item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleAr.includes(searchTerm),
  );

  return (
    <>
      <Search onSearch={setSearchTerm} />
      <FlatList
        data={filteredSurahs}
        keyExtractor={(item, index) => item.index + '-' + index}
        contentContainerStyle={styles.content}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('surahPage', {item})}>
            <View style={styles.surahCard}>
              <View style={styles.surahNumberContainer}>
                <Text style={styles.surahNumber}>
                  {parseInt(item.index, 10)}
                </Text>
              </View>
              <View style={styles.surahInfo}>
                <Text style={styles.surahTitle}>{item.title}</Text>
                <Text style={styles.surahSubTitle}>{item.titleAr}</Text>
                <Text style={styles.surahAyahCount}>{item.count} Ayahs</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.iconButton}>
                  <Image
                    source={require('../../assets/icons/favourite.png')}
                    style={styles.actionIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  surahCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFFDC',
    borderRadius: 8,
    marginBottom: 10,
    padding: 12,
  },
  surahNumberContainer: {
    width: 35,
    height: 35,
    backgroundColor: '#AFE1AF',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '45deg'}],
  },
  surahNumber: {
    fontWeight: 'bold',
    color: '#2c3e50',
    transform: [{rotate: '-45deg'}],
  },

  // surahNumberContainer: {
  //   width: 45,
  //   height: 45,
  //   borderRadius: 22.5,
  //   backgroundColor: '#d3eedd',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // surahNumber: {
  //   fontWeight: 'bold',
  //   color: '#2c3e50',
  // },
  surahInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  surahTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  surahSubTitle: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'left',
  },
  surahAyahCount: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
  actionIcon: {
    width: 20,
    height: 20,
    tintColor: '#2c3e50',
  },
});

export default SurahList;

// For round surah container
// surahNumberContainer: {
//   width: 45,
//   height: 45,
//   borderRadius: 22.5,
//   backgroundColor: '#d3eedd',
//   justifyContent: 'center',
//   alignItems: 'center',
// },
// surahNumber: {
//   fontWeight: 'bold',
//   color: '#2c3e50',
// },

//  Ubaid ur Rehman
