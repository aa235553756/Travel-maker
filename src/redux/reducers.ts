import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import randomTourReducer from './randomTourSlice';
import toursFormReducer from './toursFormSlice'

const rootReducer = combineReducers({
  counter: counterReducer,
  randomTour: randomTourReducer,
  toursForm: toursFormReducer
});

export default rootReducer;
