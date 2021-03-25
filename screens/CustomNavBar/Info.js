import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import PhoneIcon from 'react-native-vector-icons/Ionicons';
import DotIcon from 'react-native-vector-icons/Entypo';
import SocialIcon from 'react-native-vector-icons/Fontisto';
import Geocoder from 'react-native-geocoding';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

function mapStateToProps(state) {
  return {vendor: state.selectedVendorReducer};
}

function Info(props) {
  const vendor = props.vendor.info;
  const [fullAddress, setFullAddress] = useState('');

  Geocoder.init('AIzaSyDT6RWpG2NTS1QPMiuAgCJdHgazIfI7WMA');
  Geocoder.from(vendor.address.latitude, vendor.address.longitude)
    .then((json) => {
      setFullAddress(json.results[0].formatted_address);
    })
    .catch((error) => console.warn(error));

  function handleShowInMap() {
    props.sheetRef.current.snapTo(1);
    props.mapViewRef.current.animateToRegion(vendor.address, 500);
  }

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <Text style={styles.title}>Street Tacos</Text>
      <Text style={styles.subTitle}>
        The best street tacos by {vendor.name}!
      </Text>
      <Image
        style={styles.image}
        source={{
          uri: vendor.image,
        }}
      />
      <View style={styles.addressBox}>
        <Text style={styles.addressText}>
          {fullAddress.replace(/[,](?=.*[,])/g, '\n')}
        </Text>
        <TouchableOpacity style={styles.buttonMap} onPress={handleShowInMap}>
          <Text style={styles.buttonMapText}>Show on Map</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.timeBox}>
        <Text style={styles.timeText}>Daily 9:30am - 9:00pm</Text>
        <DotIcon name="dot-single" size={50} color="green" />
      </View>
      <View style={styles.phoneBox}>
        <Text style={styles.addressText}>+1 (253) 457-74-40</Text>
        <PhoneIcon name="call" size={22} color="#707070" />
      </View>
      <View style={styles.socialBox}>
        <TouchableOpacity style={styles.socialIcon}>
          <SocialIcon name="instagram" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <SocialIcon name="whatsapp" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <SocialIcon name="facebook" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <SocialIcon name="twitter" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '100%',
  },

  title: {
    marginTop: 20,
    fontWeight: '600',
    fontSize: 40,
    color: 'white',
  },

  subTitle: {
    fontSize: 20,
    color: '#707070',
  },

  image: {
    marginTop: 30,
    width: '100%',
    height: 200,
    borderRadius: 10,
  },

  addressBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#707070',
    height: 120,
  },

  addressText: {
    color: 'white',
    fontSize: 20,
  },

  buttonMap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 40,
    backgroundColor: '#642D86',
    borderRadius: 20,
  },

  buttonMapText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },

  timeBox: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#707070',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },

  timeText: {
    fontWeight: '600',
    fontSize: 20,
    color: 'white',
  },

  phoneBox: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#707070',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  socialBox: {
    flexDirection: 'row',
    marginTop: 30,
  },

  socialIcon: {
    backgroundColor: '#642D86',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: 60,
    height: 60,
    marginRight: 20,
  },
});

export default connect(mapStateToProps, null)(Info);
