import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Info from './Info';
import Reviews from './Reviews';
import Sell from './Sell';

export default function VendorProfileTabs(props) {
  const Tab = createMaterialTopTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        style={styles.container}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: '#707070',
          style: {
            backgroundColor: 'black',
            borderTopWidth: 1,
            borderTopColor: '#707070',
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
          name="Info"
          children={() => (
            <Info
              mapViewRef={props.mapViewRef}
              sheetRef={props.sheetRef}
              setSelectedView={props.setSelectedView}
            />
          )}
        />
        <Tab.Screen name="Sell" children={() => <Sell />} />
        <Tab.Screen name="Reviews" component={Reviews} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
});
