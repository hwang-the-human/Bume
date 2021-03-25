import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ScrollViewComponent,
  SafeAreaView,
  FlatList,
} from 'react-native';
import FoodItem from './FoodItem';

export default function FoodView(props) {
  return (
    <SafeAreaView style={{backgroundColor: '#111015'}}>
      <ScrollView style={styles.foodView}>
        {props.foodArray.length === 0 ? (
          <Text style={styles.foodView__text}>Empty</Text>
        ) : (
          props.foodArray
            .sort((a, b) => (a.distance > b.distance ? 1 : -1))
            .map((item, index) => (
              <FoodItem
                key={index}
                sheetRef={props.sheetRef}
                animation={props.animation}
                description={item.description}
                distance={item.distance}
                image={item.image}
                price={item.price}
                title={item.title}
                items={item}
              />
            ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  foodView: {
    backgroundColor: '#111015',
    height: '100%',
    width: '90%',
    alignSelf: 'center',
  },

  foodView__text: {
    color: 'white',
    fontSize: 30,
    alignSelf: 'center',
    top: 200,
  },
});
