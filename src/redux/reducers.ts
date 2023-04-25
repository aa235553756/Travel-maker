import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import randomTourReducer from './randomTourSlice';
import toursFormReducer from './toursFormSlice'
import isQueryReducer from './isQuerySlice'

const rootReducer = combineReducers({
  counter: counterReducer,
  randomTour: randomTourReducer,
  toursForm: toursFormReducer,
  isQuery: isQueryReducer
});

export default rootReducer;
