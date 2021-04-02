import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import FoodItem from '../search/FoodItem';

export default function FavoriteView(props) {
  return (
    <View style={styles.favoriteView}>
      {/* <FoodItem /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteView: {
    height: '100%',
    width: '100%',
    backgroundColor: '#111015',
  },
});
