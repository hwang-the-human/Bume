import database from '@react-native-firebase/database';

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

// REDUCERS

export function vendorReducer(state = {}, action) {
  switch (action.type) {
    case 'CREATE_VENDOR':
      const newReference = database().ref('users/vendors').push();
      newReference
        .set(action.payload.vendor)
        .then(() => console.log('Data updated.'));
    case 'SET_VENDORS':
      state = action.payload.vendors;
    default:
      return state;
  }
}

export function selectedVendorReducer(state = {}, action) {
  switch (action.type) {
    case 'SELECT_VENDOR':
      state = action.payload.vendor;
    default:
      return state;
  }
}
