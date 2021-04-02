import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {selectVendor} from '../../redux/vendorReducer';
import StarIcon from 'react-native-vector-icons/AntDesign';

function mapDispatchToProps(dispatch) {
  return {
    selectVendor: (vendor) => dispatch(selectVendor(vendor)),
  };
}

function VendorItem(props) {
  function handleOpenProfile() {
    props.sheetRef.current.snapTo(2);
    props.selectVendor(props.vendor);
  }

  function calculateRating() {
    var sumRatings = 0;
    var numberReviewers = 0;
    props.vendor.reviews.map((reviewer, index) => {
      sumRatings += reviewer.setRating;
      numberReviewers += 1;
    });
    sumRatings = Math.round(sumRatings / numberReviewers);
    return sumRatings;
  }
  return (
    <View style={styles.vendorItem__container}>
      <View style={styles.vendorItem__imageBox}>
        <Image
          style={styles.vendorItem__image}
          source={{
            uri: props.image,
          }}
        />
        <View style={styles.vendorItem__titleBox}>
          <Text style={styles.vendorItem__name}>{props.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <StarIcon name="staro" size={20} color="gold" />
            <StarIcon name="staro" size={20} color="gold" />
            <StarIcon name="staro" size={20} color="gold" />
            <StarIcon name="staro" size={20} color="gold" />
            <StarIcon name="staro" size={20} color="gold" />

            <View style={{position: 'absolute', flexDirection: 'row'}}>
              {Array.from(Array(calculateRating()), (e, index) => {
                return (
                  <StarIcon key={index} name="star" size={20} color="gold" />
                );
              })}
            </View>
          </View>
          <Text style={styles.vendorItem__distance}>
            {props.distance} miles away
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.vendorItem__button}
        onPress={handleOpenProfile}>
        <Text style={styles.vendorItem__buttonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  vendorItem__container: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#707070',
    width: 350,
    height: 130,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  vendorItem__imageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },

  vendorItem__image: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },

  vendorItem__titleBox: {
    alignSelf: 'flex-start',
    height: '100%',
    justifyContent: 'space-between',
    marginLeft: 10,
  },

  vendorItem__name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  vendorItem__distance: {
    // marginTop: 10,
    color: '#707070',
    fontSize: 16,
  },

  vendorItem__button: {
    backgroundColor: '#642D86',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    height: 40,
    width: 100,
    borderRadius: 10,
  },

  vendorItem__buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default connect(null, mapDispatchToProps)(VendorItem);
