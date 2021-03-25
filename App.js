import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import Home from './screens/home/Home.js';
import Cart from './screens/cart/Cart.js';
import Profile from './screens/profile/Profile.js';
import CustomNavBar from './screens/CustomNavBar/CustomNavBar.js';
import Search from './screens/search/Search';
import AuthenticationStuck from './screens/authentication/AuthenticationStuck.js';
import FoodDetails from './screens/search/FoodDetails';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {setVendors} from './redux/vendorReducer.js';

function mapDispatchToProps(dispatch) {
  return {
    setVendors: (vendors) => dispatch(setVendors(vendors)),
  };
}

function App(props) {
  const [selectedView, setSelectedView] = useState('Home');
  const sheetRef = useRef(null);
  const mapViewRef = useRef(null);
  const [animation, setAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/vendors`)
      .on('value', (snapshot) => {
        props.setVendors(snapshot.val());
        console.log('DATA HAS BEEN CHANGED!');
      });
    // Stop listening for updates when no longer required
    return () => database().ref(`/users/vendors`).off('value', onValueChange);
  }, []);

  function renderSwitch(selectedView) {
    switch (selectedView) {
      case 'Home':
        return <Home sheetRef={sheetRef} mapViewRef={mapViewRef} />;
      case 'Search':
        return <Search sheetRef={sheetRef} animation={animation} />;
      case 'Profile':
        return <Profile />;
      case 'Cart':
        return <Cart sheetRef={sheetRef} />;
      default:
        return null;
    }
  }
  return (
    <View style={styles.container}>
      {/* <Home sheetRef={sheetRef} mapViewRef={mapViewRef}/> */}
      {renderSwitch(selectedView)}

      <CustomNavBar
        sheetRef={sheetRef}
        mapViewRef={mapViewRef}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        animation={animation}
      />
      <FoodDetails animation={animation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default connect(null, mapDispatchToProps)(App);
