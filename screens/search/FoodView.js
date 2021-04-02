import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FoodItem from './FoodItem';
import _ from 'lodash';
import SearchIcon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database';

function mapStateToProps(state) {
  return {consumer: state.consumerReducer};
}
function FoodView(props) {
  const [input, setInput] = useState('');
  const [foodArray, setFoodArray] = useState([]);
  function handleSearch() {
    var array = [];
    array = [];
    setFoodArray([]);
    database()
      .ref('users/vendors')
      .on('child_added', function (snapshot) {
        const vendor = snapshot.val();
        const consumer = props.consumer;
        const distance = getDistance(
          vendor.info.address.latitude,
          vendor.info.address.longitude,
          consumer.address.latitude,
          consumer.address.longitude,
        ).toFixed(1);

        for (const [key, value] of Object.entries(vendor.sell)) {
          if (
            value.title.toUpperCase().includes(input.toUpperCase()) &&
            input != ''
          ) {
            var newObject = {
              vendor: vendor,
              key: key,
              values: {value},
              distance: distance,
            };
            setFoodArray([...array, newObject]);
            array.push(newObject);
          }
        }
      });
  }

  function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c * 0.62;
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  return (
    <SafeAreaView style={{height: '100%', backgroundColor: '#111015'}}>
      <View style={styles.foodView__inputBox}>
        <TextInput
          style={styles.foodView__input}
          placeholder="Search"
          placeholderTextColor="#707070"
          value={input}
          onChangeText={(text) => setInput(text)}></TextInput>
        <TouchableOpacity
          style={styles.foodView__searchIcon}
          onPress={handleSearch}>
          <SearchIcon name="search" size={20} color="#707070" />
        </TouchableOpacity>
      </View>
      {foodArray.length === 0 ? (
        <Text style={styles.foodView__text}>Empty</Text>
      ) : (
        <FlatList
          style={styles.foodView}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          data={_.orderBy(foodArray, (item) => item.distance, ['incr'])}
          renderItem={(element) => (
            <FoodItem
              sheetRef={props.sheetRef}
              distance={element.item.distance}
              item={element.item.values.value}
              id={element.item.key}
              vendor={element.item.vendor}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  foodView: {
    backgroundColor: '#111015',
    height: '100%',
    width: '100%',
    marginBottom: '15%',
    alignSelf: 'center',
  },

  foodView__inputBox: {
    position: 'relative',
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30,
    height: 50,
    alignSelf: 'center',
  },

  foodView__input: {
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

  foodView__searchIcon: {
    position: 'absolute',
    right: 20,
    alignSelf: 'center',
  },

  foodView__text: {
    color: 'white',
    fontSize: 30,
    alignSelf: 'center',
    top: 200,
  },
});

export default connect(mapStateToProps, null)(FoodView);
