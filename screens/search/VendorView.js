import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import database from '@react-native-firebase/database';
import SearchIcon from 'react-native-vector-icons/FontAwesome5';
import VendorItem from './VendorItem.js';
import _ from 'lodash';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {consumer: state.consumerReducer};
}

function VendorView(props) {
  const [input, setInput] = useState('');
  const [vendorArray, setVendorArray] = useState([]);

  function handleSearch() {
    var array = [];
    array = [];
    setVendorArray([]);
    database()
      .ref('users/vendors')
      .on('child_added', function (snapshot) {
        const vendor = snapshot.val();
        if (vendor.info.name.toUpperCase().includes(input.toUpperCase())) {
          var distance = getDistance(
            vendor.info.address.latitude,
            vendor.info.address.longitude,
            props.consumer.address.latitude,
            props.consumer.address.longitude,
          ).toFixed(1);

          const newVendor = {
            ...vendor,
            info: {...vendor.info, distance: distance},
          };

          setVendorArray([...array, newVendor]);
          array.push(newVendor);
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
      <View style={styles.vendorView__inputBox}>
        <TextInput
          style={styles.vendorView__input}
          placeholder="Search"
          placeholderTextColor="#707070"
          value={input}
          onChangeText={(text) => setInput(text)}></TextInput>
        <TouchableOpacity
          style={styles.vendorView__searchIcon}
          onPress={handleSearch}>
          <SearchIcon name="search" size={20} color="#707070" />
        </TouchableOpacity>
      </View>

      {vendorArray.length === 0 ? (
        <Text style={styles.vendorView__text}>Empty</Text>
      ) : (
        <FlatList
          style={styles.vendorView}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => Object.keys(vendorArray)[index]}
          data={_.orderBy(vendorArray, (item) => item.info.distance, ['incr'])}
          renderItem={(element) => (
            <VendorItem
              sheetRef={props.sheetRef}
              name={element.item.info.name}
              image={element.item.info.image}
              distance={element.item.info.distance}
              vendor={element.item}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  vendorView: {
    backgroundColor: '#111015',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    marginBottom: '15%',
  },

  vendorView__inputBox: {
    position: 'relative',
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30,
    height: 50,
    alignSelf: 'center',
  },

  vendorView__input: {
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

  vendorView__searchIcon: {
    position: 'absolute',
    right: 20,
    alignSelf: 'center',
  },

  vendorView__text: {
    color: 'white',
    fontSize: 30,
    alignSelf: 'center',
    top: 200,
  },
});

export default connect(mapStateToProps, null)(VendorView);
