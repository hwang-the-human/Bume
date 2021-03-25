import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import StarIcon from 'react-native-vector-icons/AntDesign';
import LikeIcon from 'react-native-vector-icons/EvilIcons';

export default function Reviewer(props) {
  const reviewer = props.reviewer;
  return (
    <View style={styles.review__container}>
      <View style={styles.review__profileBox}>
        <View style={styles.review__imageBox}>
          <Image
            style={styles.review__image}
            source={{
              uri: reviewer.image,
            }}
          />
          <View style={styles.review__personBox}>
            <Text style={styles.review__personName}>
              {reviewer.name} {reviewer.surname}
            </Text>
            <Text style={styles.review__numberReviews}>
              {reviewer.comments}
            </Text>
          </View>
        </View>
        <View style={styles.review__starsBox}>
          <StarIcon name="staro" size={20} color="gold" />
          <StarIcon name="staro" size={20} color="gold" />
          <StarIcon name="staro" size={20} color="gold" />
          <StarIcon name="staro" size={20} color="gold" />
          <StarIcon name="staro" size={20} color="gold" />

          <View style={{position: 'absolute', flexDirection: 'row'}}>
            {Array.from(Array(reviewer.setRating), (e, index) => {
              return (
                <StarIcon key={index} name="star" size={20} color="gold" />
              );
            })}
          </View>
        </View>
      </View>
      <Text style={styles.review__comment}>{reviewer.comment}</Text>
      <View style={styles.review__likeBox}>
        <Text style={styles.review__numberReviews}>Today</Text>
        <View style={styles.review__numberLikes}>
          <LikeIcon name="like" size={30} color="white" />
          <Text style={styles.review__numberReviews}>{reviewer.likes}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  review__container: {
    flexDirection: 'column',
    height: 200,
    borderBottomWidth: 0.5,
    borderBottomColor: '#707070',
    justifyContent: 'center',
  },

  review__profileBox: {
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  review__imageBox: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },

  review__personBox: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
  },

  review__personName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  review__numberReviews: {
    fontSize: 16,
    color: '#707070',
  },

  review__starsBox: {
    flexDirection: 'row',
  },

  review__image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    // resizeMode: 'cover',
  },

  review__comment: {
    marginTop: 10,
    color: 'white',
    fontSize: 20,
  },
  review__likeBox: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  review__numberLikes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
