import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default function VendorItem(props) {
  function handleOpenProfile() {
    props.sheetRef.current.snapTo(2);
  }

  return (
    <View style={styles.vendorItem__container}>
      <View style={styles.vendorItem__imageBox}>
        <Image
          style={styles.vendorItem__image}
          source={{
            uri:
              'https://laistassets.scprdev.org/i/21d6ac1576d6612384c4ccf00e0cefa2/5cc8ffd94566910009bdff06-eight.jpg',
          }}
        />
        <View style={styles.vendorItem__titleBox}>
          <Text style={styles.vendorItem__title}>John</Text>
          <Text style={styles.vendorItem__subTitle}>Distance</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.vendorItem__button}
        onPress={handleOpenProfile}>
        <Text style={styles.vendorItem__buttonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  vendorItem__container: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#707070',
    width: 350,
    height: 130,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  vendorItem__imageBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  vendorItem__image: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },

  vendorItem__titleBox: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },

  vendorItem__title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },

  vendorItem__subTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#707070',
  },

  vendorItem__button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 24,
    backgroundColor: '#642D86',
    borderRadius: 10,
  },

  vendorItem__buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
