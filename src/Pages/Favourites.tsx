import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Favourites = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your favourite Surahs will appear here.</Text>
      <Text style={styles.text}>Module under developemnt.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fdfdfd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#666',
    fontSize: 16,
  },
});

export default Favourites;
