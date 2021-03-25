import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FoodItem from '../search/FoodItem';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

function mapStateToProps(state) {
  return {vendor: state.selectedVendorReducer};
}

function Sell(props) {
  const sell = props.vendor.sell;
  return (
    <ScrollView style={styles.sell}>
      <Text style={styles.sell__categoryText}>Food</Text>
      {sell.map((item, index) => (
        <FoodItem
          key={index}
          animation={props.animation}
          description={item.description}
          image={item.image}
          price={item.price}
          title={item.title}
        />
      ))}
    </ScrollView>
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
