import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import MenuNav from './MenuNav';
import VendorProfileTabs from './VendorProfileTabs';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {vendor: state.selectedVendorReducer};
}

function CustomNavBar(props) {
  const renderContent = () => (
    <View style={styles.bottomContainer}>
      <MenuNav
        selectedView={props.selectedView}
        setSelectedView={props.setSelectedView}
        sheetRef={props.sheetRef}
      />
      {Object.keys(props.vendor).length === 0 ? (
        <Text style={styles.errorText}>Empty</Text>
      ) : (
        <VendorProfileTabs
          mapViewRef={props.mapViewRef}
          sheetRef={props.sheetRef}
          setSelectedView={props.setSelectedView}
        />
      )}
    </View>
  );

  return (
    <BottomSheet
      ref={props.sheetRef}
      snapPoints={['10%', '40%', '80%']}
      borderRadius={30}
      renderContent={renderContent}
    />
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: 'black',
    paddingTop: 16,
    paddingBottom: 16,
    height: '100%',
  },

  MenuNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  textNav: {
    flex: 1,
    overflow: 'hidden',
    color: 'white',
    textAlign: 'center',
    paddingTop: 6, //change!/
    width: 100,
    fontWeight: '600',
    borderRadius: 14,
    backgroundColor: '#642D86',
  },

  errorText: {
    color: 'white',
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 100,
  },
});

export default connect(mapStateToProps)(CustomNavBar);
