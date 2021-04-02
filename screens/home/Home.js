import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  Button,
  alert,
  SafeAreaView,
} from 'react-native';
import MapView from 'react-native-map-clustering';
import {Callout, Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import {connect} from 'react-redux';
import {selectVendor} from '../../redux/vendorReducer';
import Geolocation from '@react-native-community/geolocation';
import LocationIcon from 'react-native-vector-icons/FontAwesome5';

function mapStateToProps(state) {
  return {vendors: state.vendorReducer};
}

function mapDispatchToProps(dispatch) {
  return {
    selectVendor: (vendor) => dispatch(selectVendor(vendor)),
  };
}

function Home(props) {
  const [userLocation, setUserLocation] = useState({});
  const [distance, setDistance] = useState(0);

  function handleMarker(vendor) {
    var newDistance = getDistance(
      vendor.info.address.latitude,
      vendor.info.address.longitude,
      userLocation.latitude,
      userLocation.longitude,
    ).toFixed(1);
    setDistance(newDistance);
    props.mapViewRef.current.animateToRegion(vendor.info.address, 500);
    props.sheetRef.current.snapTo(1);
    const newVendor = {
      ...vendor,
      info: {...vendor.info, distance: newDistance},
    };
    props.selectVendor(newVendor);
  }

  useEffect(() => {
    Geolocation.getCurrentPosition((info) =>
      setUserLocation({
        longitude: info.coords.longitude,
        latitude: info.coords.latitude,
      }),
    );
  }, []);

  function handleUserLocation() {
    props.mapViewRef.current.animateToRegion(userLocation, 500);
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
    // <SafeAreaView style={{alignItems: 'center'}}>
    //   <Text onPress={handleChooseImage}>Choose</Text>
    //   <Text onPress={sendImage}>Send</Text>
    // </SafeAreaView>
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_DEFAULT}
        showsUserLocation={true}
        animationEnabled={false}
        userLocationAnnotationTitle="You are here"
        ref={props.mapViewRef}
        initialRegion={{
          latitude: 34.23833238,
          longitude: -118.523664572,
          latitudeDelta: 0.8,
          longitudeDelta: 0.8,
        }}
        style={styles.map}
        clusterColor="#642D86">
        {Object.values(props.vendors).map((vendor) => (
          <Marker
            tracksViewChanges={false}
            key={vendor.info.address.latitude}
            coordinate={vendor.info.address}
            image={require('../../assets/VendorIcon.png')}
            onPress={() => handleMarker(vendor)}>
            <Callout tooltip>
              <View style={styles.infoWindow}>
                <Text>{distance} miles away</Text>
              </View>
              <View style={styles.arrow}></View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.locationButton}
        onPress={handleUserLocation}>
        <LocationIcon name="location-arrow" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 2,
  },

  MenuNav: {
    flexDirection: 'row',
  },

  locationButton: {
    position: 'absolute',
    backgroundColor: '#642D86',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
    right: 20,
    top: 100,
  },

  infoWindow: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 30,
    zIndex: 1,
    borderRadius: 4,
  },

  arrow: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'white',
    width: 20,
    transform: [{rotate: '45deg'}],
    height: 20,
    top: 16,
    borderRadius: 4,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
