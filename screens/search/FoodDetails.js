import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  Dimensions,
} from 'react-native';
import CloseIcon from 'react-native-vector-icons/Ionicons';

export default function FoodDetails(props) {
  const screenHeight = Dimensions.get('window').height;
  const fadeIn = {
    transform: [
      {
        translateY: props.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, screenHeight],
        }),
      },
    ],
    opacity: props.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
  };
  function handleCloseDetails() {
    Animated.timing(props.animation, {
      useNativeDriver: false,
      toValue: 1,
      duration: 100,
      easing: Easing.ease,
    }).start();
  }

  return (
    <Animated.View style={[styles.foodDetails, fadeIn]}>
      <TouchableOpacity
        style={styles.foodDetails__closeButton}
        onPress={handleCloseDetails}>
        <View style={styles.foodDetails__closeIcon}>
          <CloseIcon name="close" size={30} color="white" />
        </View>
      </TouchableOpacity>

      <Image
        style={styles.foodDetails__image}
        source={{
          uri:
            'https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg',
        }}
      />

      <Text style={styles.foodDetails__description}>
        A taco is a traditional Mexican dish consisting of a small hand-sized
        corn or wheat tortilla topped with a filling. The tortilla is then
        folded around the filling and eaten by hand.
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  foodDetails: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 2,
    top: 150,
    height: 600,
    width: 350,
    backgroundColor: 'black',
    borderRadius: 20,
    zIndex: 100,
  },

  foodDetails__closeButton: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    left: 10,
  },

  foodDetails__closeIcon: {
    backgroundColor: '#642D86',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  foodDetails__image: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  foodDetails__description: {
    margin: 10,
    color: 'white',
    fontSize: 20,
  },
});
