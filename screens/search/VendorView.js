import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import VendorItem from './VendorItem.js';

export default function VendorView(props) {
  return (
    <ScrollView style={styles.vendorView}>
      <VendorItem sheetRef={props.sheetRef}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  vendorView: {
    backgroundColor: '#111015',
    height: '100%',
    width: '100%',
  },
});
