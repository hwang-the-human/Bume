import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import SearchIcon from 'react-native-vector-icons/FontAwesome5';
import SearchTabs from './SearchTabs';
import database from '@react-native-firebase/database';

export default function Search(props) {
  const [input, setInput] = useState('');
  const [foodArray, setFoodArray] = useState([]);
  var array = [];
  function handleSearch() {
    array = [];
    setFoodArray([]);
    database()
      .ref('users/vendors')
      .on('child_added', function (snapshot) {
        snapshot.val().sell.map((item) => {
          if (item.title.toUpperCase() === input.toUpperCase()) {
            setFoodArray([...array, item]);
            array.push(item);
          }
        });
      });
  }

  return (
    <SafeAreaView style={styles.search}>
      <StatusBar barStyle="light-content" />
      <View style={styles.search__inputBox}>
        <TextInput
          style={styles.search__input}
          placeholder="Search"
          placeholderTextColor="#707070"
          value={input}
          onChangeText={(text) => setInput(text)}></TextInput>
        <TouchableOpacity
          style={styles.search__searchIcon}
          onPress={handleSearch}>
          <SearchIcon name="search" size={20} color="#707070" />
        </TouchableOpacity>
      </View>
      <SearchTabs
        sheetRef={props.sheetRef}
        animation={props.animation}
        foodArray={foodArray}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search: {
    height: '100%',
    backgroundColor: '#111015',
    alignItems: 'center',
  },

  search__inputBox: {
    position: 'relative',
    flexDirection: 'row',
    marginTop: 50,
    height: 50,
  },

  search__input: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#642D86',
    width: 350,
    height: '100%',
    borderRadius: 10,
    marginBottom: 30,
    color: 'white',
    paddingLeft: 16,
    fontSize: 16,
  },

  search__searchIcon: {
    position: 'absolute',
    right: 20,
    alignSelf: 'center',
  },
});
