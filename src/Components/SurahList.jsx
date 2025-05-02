import React from 'react';
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

const SurahList = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={surahs}
      keyExtractor={(item, index) => item.index + index}
      contentContainerStyle={styles.content}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('surahPage', {item})}>
          <View style={styles.surahCard}>
            <View style={styles.surahNumberContainer}>
              <Text style={styles.surahNumber}>{parseInt(item.index, 10)}</Text>
            </View>
            <View style={styles.surahInfo}>
              <Text style={styles.surahTitle}>{item.title}</Text>
              <Text style={styles.surahSubTitle}>{item.titleAr}</Text>
              <Text style={styles.surahAyahCount}>{item.count} Ayahs</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.iconButton}>
                <Image
                  source={require('../../assets/icons/download.png')}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
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
  );
};

const styles = StyleSheet.create({
  content: {padding: 16, backgroundColor: '#f5f5f5'},
  surahCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9f5ee',
    borderRadius: 8,
    marginBottom: 10,
    padding: 12,
  },
  surahNumberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d3eedd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahNumber: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
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
