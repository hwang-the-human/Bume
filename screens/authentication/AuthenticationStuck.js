import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Consumer from './Consumer';
import Vendor from './Vendor';

export default function AuthenticationStuck() {
  const Stuck = createStackNavigator();
  return (
    <NavigationContainer>
      <Stuck.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#111015',
            shadowOffset: {height: 0, width: 0},
          },
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTintColor: '#707070',
        }}>
        <Stuck.Screen name="SignIn" component={SignIn} />
        <Stuck.Screen name="SignUp" component={SignUp} />
        <Stuck.Screen name="Consumer" component={Consumer} />
        <Stuck.Screen name="Vendor" component={Vendor} />
      </Stuck.Navigator>
    </NavigationContainer>
  );
}
