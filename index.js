/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import store from './redux/store';
import {Provider} from 'react-redux';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

function RootApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(RootApp));
