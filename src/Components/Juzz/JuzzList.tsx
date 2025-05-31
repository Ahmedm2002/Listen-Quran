import React from 'react';
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
import {juzData} from '../../../resources/Juzz/juzz';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const scaleFont = size => {
  const scale = SCREEN_WIDTH / 375;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

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
            onPress={() => navigation.navigate('JuzzPage', {item})}>
            <View style={styles.juzzCard}>
              <View style={styles.juzzInfo}>
                <View style={styles.rowBetween}>
                  {/* Empty space on the left */}
                  <View style={styles.leftSection}></View>

                  {/* Right Side */}
                  <View style={styles.rightContainer}>
                    <Text style={styles.juzzArabic}>{item.arabic}</Text>
                    <View style={styles.juzzNumberContainer}>
                      <Text style={styles.juzzNumber}>{item.id}</Text>
                    </View>
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
  juzzCard: {
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
  juzzInfo: {
    flex: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flex: 1, // just empty space
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  juzzNumberContainer: {
    width: 45,
    height: 45,
    backgroundColor: '#AFE1AF',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '45deg'}],
    borderRadius: 10,
    marginLeft: 8,
  },
  juzzNumber: {
    color: '#1A1A1A',
    fontWeight: 'bold',
    transform: [{rotate: '-45deg'}],
    fontSize: scaleFont(15),
  },
  juzzArabic: {
    fontSize: scaleFont(20),
    color: '#1A1A1A',
    fontWeight: '700',
    marginRight: 20,
  },
});

export default JuzzList;
