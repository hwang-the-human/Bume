import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import SearchTabs from './SearchTabs';

export default function Search(props) {
  return (
    <SafeAreaView style={styles.search}>
      <StatusBar barStyle="light-content" />
      <SearchTabs sheetRef={props.sheetRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search: {
    height: '100%',
    backgroundColor: '#111015',
    alignItems: 'center',
  },
});
