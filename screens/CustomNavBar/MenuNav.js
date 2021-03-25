import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ProfileIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapIcon from 'react-native-vector-icons/FontAwesome5';
import SearchIcon from 'react-native-vector-icons/FontAwesome5';
import Cart from 'react-native-vector-icons/Feather';

export default function MenuNav(props) {
  function handleSelectView(view) {
    props.setSelectedView(view);
    props.sheetRef.current.snapTo(0);
  }
  return (
    <View style={styles.MenuNav}>
      <TouchableOpacity onPress={() => handleSelectView('Home')}>
        {props.selectedView === 'Home' ? (
          <Text style={styles.textNav}>Map</Text>
        ) : (
          <MapIcon name="map-marker-alt" size={30} color="#707070" />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelectView('Search')}>
        {props.selectedView === 'Search' ? (
          <Text style={styles.textNav}>Search</Text>
        ) : (
          <SearchIcon name="search" size={30} color="#707070" />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelectView('Profile')}>
        {props.selectedView === 'Profile' ? (
          <Text style={styles.textNav}>Profile</Text>
        ) : (
          <ProfileIcon name="card-account-details" size={30} color="#707070" />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelectView('Cart')}>
        {props.selectedView === 'Cart' ? (
          <Text style={styles.textNav}>Cart</Text>
        ) : (
          <Cart name="shopping-cart" size={30} color="#707070" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  MenuNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  textNav: {
    flex: 1,
    overflow: 'hidden',
    color: 'white',
    textAlign: 'center',
    paddingTop: 6, //change!/
    width: 100,
    fontWeight: '600',
    borderRadius: 14,
    backgroundColor: '#642D86',
  },
});
