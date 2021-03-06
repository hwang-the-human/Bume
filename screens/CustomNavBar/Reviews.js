import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import StarIcon from 'react-native-vector-icons/AntDesign';
import Reviewer from './Reviewer';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

function mapStateToProps(state) {
  return {vendor: state.selectedVendorReducer};
}

function Reviews(props) {
  const reviews = props.vendor.reviews;

  function calculateRating() {
    var sumRatings = 0;
    var numberReviewers = 0;
    reviews.map((reviewer) => {
      sumRatings += reviewer.setRating;
      numberReviewers += 1;
    });
    return Math.round(sumRatings / numberReviewers);
  }
  return (
    <ScrollView style={styles.container}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <TouchableOpacity style={styles.ratingBox}>
          <View style={styles.starsBox}>
            <StarIcon name="staro" size={40} color="gold" />
            <StarIcon name="staro" size={40} color="gold" />
            <StarIcon name="staro" size={40} color="gold" />
            <StarIcon name="staro" size={40} color="gold" />
            <StarIcon name="staro" size={40} color="gold" />
          </View>
          <Text style={styles.textRating}>
            Have you been here? Write a review!
          </Text>
        </TouchableOpacity>
        <View style={styles.subRatingBox}>
          <View style={styles.subStarsBox}>
            <Text style={styles.subTextRating}>{calculateRating()}.0</Text>
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
          </View>
          <Text style={styles.subTextRating}>918 reviews</Text>
        </View>

        {reviews.map((reviewer, index) => (
          <Reviewer key={index} reviewer={reviewer} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '100%',
  },
  ratingBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },

  starsBox: {
    width: 250,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  textRating: {
    color: 'white',
    fontSize: 22,
    marginTop: 20,
    fontWeight: '500',
  },

  subRatingBox: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#707070',
    borderBottomWidth: 0.5,
    borderBottomColor: '#707070',
  },

  subStarsBox: {
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  subTextRating: {
    textAlign: 'center',
    color: 'white',
    marginRight: 10,
    fontSize: 20,
    fontWeight: '600',
  },
});

export default connect(mapStateToProps, null)(Reviews);
