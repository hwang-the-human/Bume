import React from 'react';
import {StyleSheet, View} from 'react-native';
import AuthenticationStuck from './screens/authentication/AuthenticationStuck.js';
import {connect} from 'react-redux';
import UserView from './UserView.js';

function mapStateToProps(state) {
  return {consumer: state.consumerReducer, userId: state.userIdReducer};
}

function App(props) {
  return (
    <View style={styles.container}>
      {props.userId === '' ? <AuthenticationStuck /> : <UserView />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});

export default connect(mapStateToProps, null)(App);
