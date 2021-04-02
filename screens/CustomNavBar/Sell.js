import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import FoodItem from '../search/FoodItem';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

function mapStateToProps(state) {
  return {
    vendor: state.selectedVendorReducer,
  };
}

function Sell(props) {
  const vendor = props.vendor;
  return (
    <FlatList
      style={styles.sell}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => Object.keys(vendor.sell)[index]}
      data={Object.values(vendor.sell)}
      renderItem={(element) => (
        <FoodItem
          sheetRef={props.sheetRef}
          distance={vendor.info.distance}
          item={element.item}
          id={Object.keys(vendor.sell)[element.index]}
          vendor={vendor}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  sell: {
    backgroundColor: 'black',
    height: '100%',
  },

  sell__categoryText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 40,
    marginTop: 20,
  },
});

export default connect(mapStateToProps, null)(Sell);
