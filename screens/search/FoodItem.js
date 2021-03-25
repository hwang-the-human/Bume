import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database';
import {selectVendor} from '../../redux/vendorReducer';

function mapDispatchToProps(dispatch) {
  return {
    selectVendor: (vendor) => dispatch(selectVendor(vendor)),
  };
}

function FoodItem(props) {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [isAnimated, setIsAnimated] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  function handleOpenProfile() {
    props.sheetRef.current.snapTo(2);

    database()
      .ref('users/vendors')
      .on('value', function (snapshot) {
        mainLoop: for (const object in snapshot.val()) {
          const array = snapshot.val()[object].sell;
          for (let i = 0; i < array.length; i++) {
            if (JSON.stringify(array[i]) === JSON.stringify(props.items)) {
              props.selectVendor(snapshot.val()[object]);
              break mainLoop;
            }
          }
        }
      });
  }

  function handleAdd() {}

  function handleRemove() {}

  function handleOpen() {
    Animated.timing(animation, {
      useNativeDriver: false,
      toValue: isAnimated ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
    }).start(() => {
      setIsAnimated(!isAnimated);
    });
  }

  const containerMove = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [150, 500],
    }),
  };

  const textMove = {
    top: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 280],
    }),
  };

  const imageMove = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 250],
    }),

    width: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [120, screenWidth],
    }),
  };

  return (
    <TouchableWithoutFeedback
      style={styles.foodItem}
      onPress={handleOpen}
      onLayout={(e) => {
        setScreenWidth(e.nativeEvent.layout.width);
      }}>
      <Animated.View style={[styles.foodItem__container, containerMove]}>
        <Animated.View style={[styles.foodItem__textBox, textMove]}>
          <Text style={styles.foodItem__title}>{props.title}</Text>
          <Text style={styles.foodItem__description}>{props.description}</Text>
          <Text style={styles.foodItem__price}>{props.price}</Text>
          {props.distance && (
            <Text style={styles.foodItem__distance}>
              {props.distance} miles away
            </Text>
          )}
        </Animated.View>

        <Animated.Image
          style={[styles.foodItem__image, imageMove]}
          source={{
            uri: props.image,
          }}
        />
        <View style={styles.foodItem__countBox}>
          <Text style={styles.foodItem__count}>Count: 0</Text>
          <View style={styles.foodItem__buttonsBox}>
            <TouchableOpacity
              style={styles.foodItem__button}
              onPress={handleAdd}>
              <Text style={{color: 'white', fontSize: 40}}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.foodItem__button}
              onPress={handleRemove}>
              <Text style={{color: 'white', fontSize: 40}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        {props.distance && (
          <TouchableOpacity
            onPress={handleOpenProfile}
            style={styles.foodItem__profileButton}>
            <Text style={{color: 'white', fontSize: 20}}>Profile</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  foodItem: {},

  foodItem__container: {
    marginTop: 30,
    alignItems: 'center',
    flexDirection: 'column',
    alignItems: 'flex-end',
    borderBottomWidth: 0.5,
    borderBottomColor: '#707070',
    overflow: 'hidden',
  },

  foodItem__image: {
    borderRadius: 10,
    height: 100,
    width: 120,
  },

  foodItem__textBox: {
    left: 0,
    position: 'absolute',
    color: 'white',
    justifyContent: 'space-around',
    width: '100%',
  },

  foodItem__title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  foodItem__description: {
    marginTop: 10,
    fontSize: 20,
    color: '#707070',
  },

  foodItem__price: {
    marginTop: 10,
    fontSize: 20,
    color: 'white',
  },

  foodItem__distance: {
    marginTop: 10,
    // fontSize: 20,
    color: '#707070',
  },

  foodItem__countBox: {
    marginTop: 170,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  foodItem__count: {
    fontSize: 20,
    color: 'white',
  },

  foodItem__profileButton: {
    backgroundColor: '#642D86',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    bottom: 100,
    height: 40,
    width: 100,
    borderRadius: 10,
  },

  foodItem__buttonsBox: {
    backgroundColor: '#642D86',
    borderRadius: 10,
    flexDirection: 'row',
  },

  foodItem__button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
});

export default connect(null, mapDispatchToProps)(FoodItem);
