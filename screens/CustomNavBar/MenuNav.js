import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import ProfileIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapIcon from 'react-native-vector-icons/FontAwesome5';
import SearchIcon from 'react-native-vector-icons/FontAwesome5';
import Cart from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {
    consumer: state.consumerReducer,
    count: state.countReducer,
    countAnimation: state.countAnimationReducer,
  };
}

function MenuNav(props) {
  function handleSelectView(view) {
    props.setSelectedView(view);
    props.sheetRef.current.snapTo(0);
  }

  const countMove = {
    transform: [
      {
        scale: props.countAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.5],
        }),
      },
    ],
  };

  function handleAnimationItem() {
    Animated.sequence([
      Animated.timing(props.countAnimation, {
        useNativeDriver: false,
        toValue: 1,
        duration: 200,
        friction: 3,
        tension: 40,
        easing: Easing.ease,
      }),
      Animated.timing(props.countAnimation, {
        useNativeDriver: false,
        toValue: 0,
        duration: 200,
        friction: 3,
        tension: 40,
        easing: Easing.ease,
      }),
    ]).start();
  }

  return (
    <View style={styles.MenuNav}>
      <TouchableOpacity onPress={() => handleSelectView('Home')}>
        {props.selectedView === 'Home' ? (
          <View style={styles.option}>
            <Text style={styles.textNav}>Map</Text>
          </View>
        ) : (
          <MapIcon name="map-marker-alt" size={32} color="#707070" />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelectView('Search')}>
        {props.selectedView === 'Search' ? (
          <View style={styles.option}>
            <Text style={styles.textNav}>Search</Text>
          </View>
        ) : (
          <SearchIcon name="search" size={32} color="#707070" />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelectView('Profile')}>
        {props.selectedView === 'Profile' ? (
          <View style={styles.option}>
            <Text style={styles.textNav}>Profile</Text>
          </View>
        ) : (
          <ProfileIcon name="card-account-details" size={32} color="#707070" />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelectView('Cart')}>
        {props.selectedView === 'Cart' ? (
          <View style={styles.option}>
            <Text style={styles.textNav}>Cart</Text>
          </View>
        ) : (
          <View>
            <Cart name="shopping-cart" size={32} color="#707070"></Cart>
            {props.count > 0 && (
              <Animated.Text style={[styles.countText, countMove]}>
                {props.count}
              </Animated.Text>
            )}
          </View>
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

  option: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
    width: 100,
    borderRadius: 14,
    backgroundColor: '#642D86',
  },

  textNav: {
    fontWeight: '600',
    color: 'white',
  },

  countText: {
    position: 'absolute',
    color: 'white',
    top: 6,
    left: '50%',
    fontWeight: '700',
    transform: [{scale: 1}],
  },
});

export default connect(mapStateToProps, null)(MenuNav);
