import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import SurahList from '../Components/SurahList';
import Favourites from './Favourites';
import JuzzPage from './JuzzPage';

const Home = () => {
  const [activeTab, setActiveTab] = useState<'surahs' | 'favourites' | 'juzs'>(
    'surahs',
  );

  const underlineAnim = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;
  const tabWidth = screenWidth / 3;

  useEffect(() => {
    let toValue = 0;
    if (activeTab === 'juzs') toValue = tabWidth;
    else if (activeTab === 'favourites') toValue = tabWidth * 2;

    Animated.timing(underlineAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeTab]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.heading}>Listen Quran</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setActiveTab('surahs')}
          style={styles.tabButton}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'surahs' && styles.activeTabText,
            ]}>
            Surahs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('juzs')}
          style={styles.tabButton}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'juzs' && styles.activeTabText,
            ]}>
            Juzz
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('favourites')}
          style={styles.tabButton}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'favourites' && styles.activeTabText,
            ]}>
            Favourites
          </Text>
        </TouchableOpacity>

        <Animated.View
          style={[styles.underline, {left: underlineAnim, width: tabWidth}]}
        />
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {activeTab === 'surahs' && <SurahList />}
        {activeTab === 'juzs' && <JuzzPage />}
        {activeTab === 'favourites' && <Favourites />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 15,
    paddingHorizontal: 16,
    paddingBottom: 15,
    backgroundColor: '#2c6e49',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    elevation: 3,
    position: 'relative',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#2c6e49',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: '#2c6e49',
    borderRadius: 2,
  },
  tabContent: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 5,
    paddingVertical: 7,
  },
});

export default Home;
