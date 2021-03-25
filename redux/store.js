import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {
  vendorReducer,
  selectedVendorReducer,
} from './vendorReducer';

const rootReducer = combineReducers({
  vendorReducer: vendorReducer,
  selectedVendorReducer: selectedVendorReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
