import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
  Easing,
} from 'react-native';
import Home from './screens/home/Home.js';
import Cart from './screens/cart/Cart.js';
import Profile from './screens/profile/Profile.js';
import CustomNavBar from './screens/CustomNavBar/CustomNavBar.js';
import Search from './screens/search/Search';
import AuthenticationStuck from './screens/authentication/AuthenticationStuck.js';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {setVendors, setConsumer, setCount} from './redux/vendorReducer.js';
import Geolocation from '@react-native-community/geolocation';

function mapStateToProps(state) {
  return {consumer: state.consumerReducer, userId: state.userIdReducer};
}

function mapDispatchToProps(dispatch) {
  return {
    setVendors: (vendors) => dispatch(setVendors(vendors)),
    setConsumer: (consumer) => dispatch(setConsumer(consumer)),
    setCount: (count) => dispatch(setCount(count)),
  };
}

function UserView(props) {
  const [selectedView, setSelectedView] = useState('Home');
  const sheetRef = useRef(null);
  const mapViewRef = useRef(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    var vendorOnValueChange = database()
      .ref(`/users/vendors`)
      .on('value', (snapshot) => {
        props.setVendors(snapshot.val());
        console.log('VENDORS DATA HAS BEEN CHANGED!');
      });
    var consumerOnValueChange = database()
      .ref('/users/consumers/' + props.userId)
      .on('value', (snapshot) => {
        var total = 0;
        total = 0;
        Object.values(snapshot.val()?.cart ?? []).map((item) => {
          total += item.price;
        });
        setTotalPrice(total);
        if (total > 0) {
          Animated.timing(animation, {
            useNativeDriver: false,
            toValue: 1,
            duration: 400,
            friction: 3,
            tension: 40,
            easing: Easing.ease,
          }).start();
        } else {
          Animated.timing(animation, {
            useNativeDriver: false,
            toValue: 0,
            duration: 400,
            friction: 3,
            tension: 40,
            easing: Easing.ease,
          }).start();
        }
        Geolocation.getCurrentPosition((info) =>
          props.setConsumer({
            key: snapshot.key,
            values: snapshot.val(),
            address: {
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
            },
          }),
        );
        var isLoaded = true;
        if (isLoaded) {
          var count = 0;
          Object.values(snapshot.val()?.cart ?? []).map((item) => {
            count += item.count;
          });
          props.setCount(count);
          isLoaded = false;
        }
        console.log('CONSUMERS DATA HAS BEEN CHANGED!');
      });
    return (
      () => database().ref(`/users/vendors`).off('value', vendorOnValueChange),
      () =>
        database()
          .ref(`/users/consumers/` + props.userId)
          .off('value', consumerOnValueChange)
    );
  }, []);

  function renderSwitch(selectedView) {
    switch (selectedView) {
      case 'Search':
        return <Search sheetRef={sheetRef} />;
      case 'Profile':
        return <Profile />;
      case 'Cart':
        return <Cart sheetRef={sheetRef} />;
      default:
        return null;
    }
  }

  const checkOutMove = {
    bottom: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 120],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={{height: '100%', width: '100%'}}>
        <Home sheetRef={sheetRef} mapViewRef={mapViewRef} />
        {renderSwitch(selectedView)}
        <CustomNavBar
          sheetRef={sheetRef}
          mapViewRef={mapViewRef}
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />
        <Animated.View style={[styles.cart__priceBox, checkOutMove]}>
          <TouchableOpacity style={styles.cart__button}>
            <Text style={styles.cart__text}>Go to checkout</Text>
            <Text style={styles.cart__text}>${totalPrice}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },

  cart__priceBox: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cart__button: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 300,
    height: 50,
    backgroundColor: '#642D86',
    borderRadius: 20,
  },

  cart__text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
