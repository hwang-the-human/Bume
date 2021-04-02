import React, {useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

// const newVendor = {
//   info: {
//     name: 'Zarina',
//     surname: 'Khvan',
//     title: 'Title',
//     subTitle: 'subTitle',
//     image: {id: 1, image: ''},
//     time: {weekdays: ['Monday', 'Saturday'], open: true},
//     address: {latitude: 37.8, longitude: -122.4324},
//     phone: '+1(457)234-12-44',
//     SSC: '1234567',
//     apps: {
//       instagram: 'hwang.the.human',
//       whatsApp: '+1457234-12-44',
//       facebook: 'hwangFacebook',
//       twitter: '@hwang97',
//     },
//   },

//   sell: {
//     image: {id: 1, image: ''},
//     title: 'title',
//     description: 'description',
//     price: '$15',
//     distance: '15 miles away',
//   },

//   reviews: {
//     rating: 3,
//     reviewer: {
//       id: 1,
//       name: 'Nikolay',
//       surname: 'Khvan',
//       comment: 'Nice!',
//       comments: 5,
//       likes: 123,
//       setRating: 3,
//       date: '31/05/97',
//     },
//   },
// };
export default function SignUp({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>I am a </Text>
      <View style={styles.buttonsBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('Consumer')}>
          <Text style={styles.buttonText}>Consumer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('Vendor')}>
          <Text style={styles.buttonText}>Vendor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111015',
  },

  buttonsBox: {
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#642D86',
    width: 300,
    height: 50,
    borderRadius: 10,
    marginBottom: 30,
  },

  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    color: 'white',
  },

  titleText: {
    top: 200,
    left: 50,
    fontSize: 60,
    color: 'white',
  },
});
