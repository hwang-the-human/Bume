import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FoodItem from '../search/FoodItem';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {consumer: state.consumerReducer};
}

function Cart(props) {
  const cartObjects = props.consumer.values.cart;
  const scrollRef = useRef(null);

  function handleOrder() {
    scrollRef.current.scrollToIndex({animated: true, index: 2});
  }

  return (
    <SafeAreaView style={styles.cart}>
      <StatusBar barStyle="light-content" />
      {cartObjects === undefined ? (
        <Text
          style={{
            color: 'white',
            fontSize: 40,
            alignSelf: 'center',
            top: 350,
          }}>
          Empty
        </Text>
      ) : (
        <FlatList
          style={{width: '100%', marginBottom: '15%'}}
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          data={Object.values(cartObjects)}
          renderItem={(element) => (
            <FoodItem
              sheetRef={props.sheetRef}
              distance={element.item.distance}
              item={element.item}
              id={Object.keys(cartObjects)[element.index]}
              isCartView={true}
            />
          )}
          keyExtractor={(item, index) => Object.keys(cartObjects)[index]}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cart: {
    height: '100%',
    width: '100%',
    backgroundColor: '#111015',
    alignItems: 'center',
  },

  cart__priceBox: {
    position: 'absolute',
    bottom: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cart__price: {
    color: 'white',
    fontSize: 40,
  },

  cart__button: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 50,
    backgroundColor: '#642D86',
    borderRadius: 30,
  },

  cart__buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
});

export default connect(mapStateToProps, null)(Cart);
