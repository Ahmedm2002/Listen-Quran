import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const formatTime = (sec: number) => {
  if (!sec || isNaN(sec)) return '0:00';

  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = Math.floor(sec % 60);

  if (hours > 0) {
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  } else {
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
};

function DurationContainer({position, duration}) {
  return (
    <View style={styles.timeContainer}>
      <Text style={styles.timeText}>{formatTime(position)}</Text>
      <Text style={styles.timeText}>{formatTime(duration)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  timeText: {
    color: '#cccccc',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default DurationContainer;
