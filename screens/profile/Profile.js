import React from 'react';
import {StyleSheet, Text, View, StatusBar, SafeAreaView} from 'react-native';
import ProfileStackNavigator from './ProfileStackNavigator';

export default function Profile() {
  return (
    <SafeAreaView style={styles.profile}>
      <StatusBar barStyle="light-content" />
      <ProfileStackNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    height: '100%',
    backgroundColor: '#111015',
  },
});
