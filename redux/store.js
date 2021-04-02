import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {
  vendorReducer,
  selectedVendorReducer,
  consumerReducer,
  countReducer,
  countAnimationReducer,
  userIdReducer,
} from './vendorReducer';

const rootReducer = combineReducers({
  vendorReducer: vendorReducer,
  selectedVendorReducer: selectedVendorReducer,
  consumerReducer: consumerReducer,
  countReducer: countReducer,
  countAnimationReducer: countAnimationReducer,
  userIdReducer: userIdReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
