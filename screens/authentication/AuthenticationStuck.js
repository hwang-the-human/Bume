import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Consumer from './Consumer';
import Vendor from './Vendor';

export default function AuthenticationStuck() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#111015',
            shadowOffset: {height: 0, width: 0},
          },
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTintColor: '#707070',
        }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Consumer" component={Consumer} />
        <Stack.Screen name="Vendor" component={Vendor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
