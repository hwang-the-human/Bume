import database from '@react-native-firebase/database';
import {Animated} from 'react-native';

// ACTIONS

export function createVendor(vendor) {
  return {
    type: 'CREATE_VENDOR',
    payload: {vendor},
  };
}

export function setVendors(vendors) {
  return {
    type: 'SET_VENDORS',
    payload: {vendors},
  };
}

export function selectVendor(vendor) {
  return {
    type: 'SELECT_VENDOR',
    payload: {vendor},
  };
}

export function createConsumer(consumer) {
  return {
    type: 'CREATE_CONSUMER',
    payload: {consumer},
  };
}

// export function updateConsumer(consumer) {
//   return {
//     type: 'UPDATE_CONSUMER',
//     payload: {consumer},
//   };
// }

export function setConsumer(consumer) {
  return {
    type: 'SET_CONSUMER',
    payload: {consumer},
  };
}

export function setCount(count) {
  return {
    type: 'SET_COUNT',
    payload: {count},
  };
}

export function incrementCount() {
  return {
    type: 'INCREMENT_COUNT',
  };
}

export function decrementCount() {
  return {
    type: 'DECREMENT_COUNT',
  };
}

export function setUserId(id) {
  return {
    type: 'SET_ID',
    payload: {id},
  };
}

// REDUCERS

export function vendorReducer(state = {}, action) {
  switch (action.type) {
    case 'CREATE_VENDOR':
      const newReference = database().ref('users/vendors').push();
      newReference
        .set(action.payload.vendor)
        .then(() => console.log('Vendor Data updated.'));
    case 'SET_VENDORS':
      return (state = action.payload.vendors);
    default:
      return state;
  }
}

export function selectedVendorReducer(state = {}, action) {
  switch (action.type) {
    case 'SELECT_VENDOR':
      return (state = action.payload.vendor);
    default:
      return state;
  }
}

export function consumerReducer(state = {}, action) {
  switch (action.type) {
    // case 'CREATE_CONSUMER':
    //   const newReference = database().ref('users/consumers').push();
    //   newReference
    //     .set(action.payload.consumer)
    //     .then(() => console.log('Consumer Data updated.'));
    // case 'UPDATE_CONSUMER':
    //   database()
    //     .ref('/users/123')
    //     .set({
    //       cart: [],
    //     })
    //     .then(() => console.log('Consumer Data set.'));
    case 'SET_CONSUMER':
      state = action.payload.consumer;
    default:
      return state;
  }
}

export function countReducer(state = 0, action) {
  switch (action.type) {
    case 'SET_COUNT':
      return (state = action.payload.count);
    case 'INCREMENT_COUNT':
      return state++;
    case 'DECREMENT_COUNT':
      return state--;
    default:
      return state;
  }
}

export function countAnimationReducer(state = new Animated.Value(0)) {
  return state;
}

export function userIdReducer(state = '', action) {
  switch (action.type) {
    case 'SET_ID':
      return (state = action.payload.id);
    default:
      return state;
  }
}
