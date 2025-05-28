import React from 'react';
import {View, StyleSheet} from 'react-native';
import JuzzDetails from '../Components/Juzz/JuzzDetails';
import iJuzz from '../Models/juzz.model';

const JuzzPage = ({route}: any) => {
  const juzz: iJuzz = route?.params?.item;

  return (
    <View style={styles.container}>
      <JuzzDetails juzz={juzz} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fdf9',
  },
});

export default JuzzPage;
