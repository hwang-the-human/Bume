import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import VendorView from './VendorView.js';
import FoodView from './FoodView.js';

export default function SearchTabs(props) {
  const Tab = createMaterialTopTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        style={styles.container}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: '#707070',
          style: {
            backgroundColor: '#111015',
          },
          labelStyle: {
            fontSize: 16,
            fontWeight: '700',
          },
          indicatorStyle: {
            backgroundColor: '#642D86',
          },
        }}>
        <Tab.Screen
          name="Food"
          children={() => (
            <FoodView
              sheetRef={props.sheetRef}
              animation={props.animation}
              foodArray={props.foodArray}
            />
          )}
        />
        <Tab.Screen
          name="Vendor"
          children={() => (
            <VendorView sheetRef={props.sheetRef} searchText={props.searchText} />
          )}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111015',
    height: '100%',
    width: '100%',
  },
});
