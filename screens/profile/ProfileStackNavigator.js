import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileView from './ProfileView';
import EditProfileScreen from './EditProfileScreen';
import FavoriteView from './FavoriteView';

export default function ProfileStackNavigator({navigation}) {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileView"
          component={ProfileView}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            title: 'Profile',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#111015',
              shadowColor: 'transparent',
            },
          }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{
            title: 'Edit Profile',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#111015',
              shadowColor: 'transparent',
            },
          }}
        />
        <Stack.Screen
          name="FavoriteView"
          component={FavoriteView}
          options={{
            title: 'Favorites',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#111015',
              shadowColor: 'transparent',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
