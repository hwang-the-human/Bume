import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  alert,
  SafeAreaView,
} from 'react-native';
import MapView from 'react-native-map-clustering';
import {Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {connect} from 'react-redux';
import {selectVendor} from '../../redux/vendorReducer';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import uuid from 'react-uuid';

function mapStateToProps(state) {
  return {vendors: state.vendorReducer};
}

function mapDispatchToProps(dispatch) {
  return {
    selectVendor: (vendor) => dispatch(selectVendor(vendor)),
  };
}

function Home(props) {
  const [image, setImage] = useState();
  function handleChooseImage() {
    ImagePicker.openPicker({
      // width: 80, // 400
      // height: 80, // 200
      cropping: true,
    })
      .then((image) => {
        ImageResizer.createResizedImage(
          image.sourceURL,
          400,
          200,
          'PNG',
          100,
          0,
          null,
        )
          .then((response) => {
            setImage({filename: uuid(), url: response.uri});
          })
          .catch((err) => {
            console.log('ERROR RESIZING IMAGE: ', err);
          });
      })
      .catch((error) => {
        console.log('ERROR OPEN IMAGE LIBRARY: ', error);
      });
  }
  async function deleteImage() {
    const reference = storage().refFromURL(
      'https://firebasestorage.googleapis.com/v0/b/bume-307515.appspot.com/o/IMG_0004.JPG?alt=media&token=7b46b02c-c566-4dd6-a4fb-3bd034caa9be',
    );
    await reference.delete();
  }

  async function sendImage() {
    const reference = storage().ref(image.filename);
    await reference.putFile(image.url);
  }

  function handleMarker(vendor) {
    props.mapViewRef.current.animateToRegion(vendor.info.address, 500);
    props.sheetRef.current.snapTo(1);
    props.selectVendor(vendor);
  }

  return (
    // <SafeAreaView style={{alignItems: 'center'}}>
    //   <Text onPress={handleChooseImage}>Choose</Text>
    //   <Text onPress={sendImage}>Send</Text>
    // </SafeAreaView>
    <MapView
      provider={PROVIDER_DEFAULT}
      animationEnabled={false}
      ref={props.mapViewRef}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={styles.map}
      clusterColor="#642D86">
      {Object.values(props.vendors).map((vendor) => (
        <Marker
          tracksViewChanges={false}
          key={vendor.info.address.latitude}
          coordinate={vendor.info.address}
          image={require('../../assets/VendorIcon.png')}
          onPress={() => handleMarker(vendor)}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111015',
  },
  map: {
    width: '100%',
    height: '100%',
    // ...StyleSheet.absoluteFillObject,
  },

  MenuNav: {
    // backgroundColor: 'red',
    flexDirection: 'row',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
