import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const Search = ({onSearch}) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  const handleClear = () => {
    setSearchText('');
    onSearch('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Surah..."
        value={searchText}
        style={styles.input}
        onChangeText={handleChange}
        placeholderTextColor="#888"
      />
      {searchText !== '' && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    color: '#2c3e50',
  },
  clearButton: {
    marginLeft: 8,
    backgroundColor: '#2c6e49',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Search;
