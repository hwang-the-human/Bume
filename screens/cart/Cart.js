import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FoodItem from '../search/FoodItem';

export default function Cart(props) {
  return (
    <SafeAreaView style={styles.cart}>
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <FoodItem
          description={'SDFSDF'}
          // key={index}
          // sheetRef={props.sheetRef}
          // description={item.description}
          // distance={item.distance}
          // image={item.image}
          // price={item.price}
          // title={item.title}
          // items={item}
        />
      </ScrollView>
      <View style={styles.cart__priceBox}>
        <Text style={styles.cart__price}>Total: $300</Text>
        <TouchableOpacity style={styles.cart__button}>
          <Text style={styles.cart__buttonText}>Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cart: {
    flex: 1,
    backgroundColor: '#111015',
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
