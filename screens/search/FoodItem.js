import React, {useState, useEffect} from 'react';
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
import {
  selectVendor,
  setCount,
  incrementCount,
  decrementCount,
} from '../../redux/vendorReducer';
import _ from 'lodash';

function mapStateToProps(state) {
  return {
    consumer: state.consumerReducer,
    count: state.countReducer,
    countAnimation: state.countAnimationReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectVendor: (vendor) => dispatch(selectVendor(vendor)),
    setCount: (count) => dispatch(setCount(count)),
    incrementCount: () => dispatch(incrementCount()),
    decrementCount: () => dispatch(decrementCount()),
  };
}

function FoodItem(props) {
  const item = props.item;
  const [isOpened, setIsOpened] = useState(false);
  const [openAnimation, setOpenAnimation] = useState(new Animated.Value(0));
  const [selectedAnimation, setSelectedAnimation] = useState(
    new Animated.Value(0),
  );
  const [isAnimated, setIsAnimated] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const cartObject = props.consumer.values.cart?.[props.id] ?? {};
  var consumerCount = cartObject?.count ?? 0;
  var consumerPrice = cartObject?.price ?? item.price;

  function handleOpenProfile() {
    props.sheetRef.current.snapTo(2);
    if (props.vendor === undefined) {
      database()
        .ref('users/vendors')
        .on('value', (snapshot) => {
          mainLoop: for (const object in snapshot.val()) {
            const array = Object.keys(snapshot.val()[object].sell);
            for (let i = 0; i < array.length; i++) {
              if (array[i] === props.id) {
                props.selectVendor(snapshot.val()[object]);
                break mainLoop;
              }
            }
          }
        });
    } else {
      props.selectVendor(props.vendor);
    }
  }

  function handleAdd() {
    if (consumerCount === 0) {
      consumerPrice = 0;
    }
    if (props.isCartView) {
      consumerPrice = consumerPrice / consumerCount;
    }
    consumerPrice += item.price;
    consumerCount++;

    database()
      .ref('/users/consumers/' + props.consumer.key + '/cart')
      .child(props.id)
      .set({
        ...item,
        distance: props.distance,
        price: consumerPrice,
        count: consumerCount,
      })
      .then(() => console.log('Consumer Data set.'));
    props.incrementCount();
    handleAnimationItem();
  }

  function handleRemove() {
    if (props.isCartView) {
      consumerPrice = consumerPrice / consumerCount;
    }
    consumerPrice -= item.price;
    consumerCount--;

    if (consumerCount === 0) {
      database()
        .ref('/users/consumers/' + props.consumer.key + '/cart/' + props.id)
        .set(null)
        .then(() => console.log('Consumer Data is removed.'));
    } else {
      database()
        .ref('/users/consumers/' + props.consumer.key + '/cart')
        .child(props.id)
        .set({
          ...item,
          price: Math.abs(consumerPrice),
          count: consumerCount,
        })
        .then(() => console.log('Consumer Data set.'));
    }
    props.decrementCount();
    handleAnimationItem();
  }

  function handleAnimationItem() {
    Animated.sequence([
      Animated.timing(props.countAnimation, {
        useNativeDriver: false,
        toValue: 1,
        duration: 200,
        friction: 3,
        tension: 40,
        easing: Easing.ease,
      }),
      Animated.timing(props.countAnimation, {
        useNativeDriver: false,
        toValue: 0,
        duration: 200,
        friction: 3,
        tension: 40,
        easing: Easing.ease,
      }),
    ]).start();
  }

  function handleOpen() {
    Animated.timing(openAnimation, {
      useNativeDriver: false,
      toValue: isAnimated ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
    }).start(() => {
      setIsAnimated(!isAnimated);
    });
  }

  const countMove = {
    transform: [
      {
        scale: props.countAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.1],
        }),
      },
    ],
  };

  const containerMove = {
    height: openAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [150, 600],
    }),
  };
  const textMove = {
    top: openAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 280],
    }),
  };

  const moveDescription = {
    maxWidth: openAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['60%', '100%'],
    }),
    height: openAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['20%', '60%'],
    }),
  };

  const imageMove = {
    height: openAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 250],
    }),

    width: openAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [120, screenWidth],
    }),
  };

  const selectedMove = {
    width: selectedAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 16],
    }),
  };

  return (
    <TouchableWithoutFeedback onPress={handleOpen}>
      <View style={styles.foodItem}>
        <Animated.View
          style={[styles.foodItem__container, containerMove]}
          onLayout={(e) => {
            setScreenWidth(e.nativeEvent.layout.width);
          }}>
          <Animated.View style={[styles.foodItem__textBox, textMove]}>
            <Text style={styles.foodItem__title}>
              {item.title}
              {consumerCount ? <Text> (x{consumerCount})</Text> : null}
            </Text>
            <Animated.Text
              style={[styles.foodItem__description, moveDescription]}>
              {item.description}
            </Animated.Text>
            <Animated.Text style={[styles.foodItem__price, countMove]}>
              ${consumerPrice}
            </Animated.Text>
            {props.distance && (
              <Text style={styles.foodItem__distance}>
                {props.distance} miles away
              </Text>
            )}
          </Animated.View>

          <Animated.Image
            style={[styles.foodItem__image, imageMove]}
            source={{
              uri: item.image,
            }}
          />
          <View style={styles.foodItem__countBox}>
            <Animated.Text style={[styles.foodItem__count, countMove]}>
              Count: {consumerCount}
            </Animated.Text>
            <View style={styles.foodItem__buttonsBox}>
              <TouchableOpacity
                style={styles.foodItem__button}
                onPress={handleRemove}>
                <Text style={{color: 'white', fontSize: 40}}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.foodItem__button}
                onPress={handleAdd}>
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
        {consumerCount > 0 && (
          <Animated.View
            style={[styles.foodItem__selectedBorder, selectedMove]}>
            {Animated.timing(selectedAnimation, {
              useNativeDriver: false,
              toValue: 1,
              duration: 300,
              easing: Easing.ease,
            }).start()}
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  foodItem: {
    width: '100%',
    marginTop: 30,
  },

  foodItem__container: {
    alignSelf: 'center',
    width: '90%',
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
    overflow: 'visible',
    left: 0,
    position: 'absolute',
    color: 'white',
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
    maxHeight: 170,
    minHeight: 50,
    color: '#707070',
  },

  foodItem__price: {
    marginTop: 6,
    fontSize: 20,
    color: 'white',
  },

  foodItem__distance: {
    marginTop: 6,
    fontSize: 16,
    color: '#707070',
  },

  foodItem__countBox: {
    marginTop: 280,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  foodItem__count: {
    fontSize: 20,
    color: 'white',
    transform: [{scale: 1}],
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

  foodItem__selectedBorder: {
    position: 'absolute',
    width: 0,
    height: '100%',
    backgroundColor: '#642D86',
    left: -8,
    zIndex: 2,
    top: 0,
    borderRadius: 50,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodItem);
