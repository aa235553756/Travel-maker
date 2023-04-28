import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import randomTourReducer from './randomTourSlice';
import toursFormReducer from './toursFormSlice'
import isQueryReducer from './isQuerySlice'
import geoLocationReducer from './geoLocationSlice'

const rootReducer = combineReducers({
  counter: counterReducer,
  randomTour: randomTourReducer,
  toursForm: toursFormReducer,
  isQuery: isQueryReducer,
  geoLocation: geoLocationReducer
});

export default rootReducer;
