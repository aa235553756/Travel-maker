// 記得去補reducer
import { createSlice } from '@reduxjs/toolkit';

// Redux 計算器 範例
const initialState = {
  value: 0,
};

export const geoLocationSlice = createSlice({
  name: 'geoLocation',
  initialState,
  reducers: {
    setGeoLocation: (state, action) => {
      state.value = action.payload
    },
  },

});

export const getGeoLocation = (state: { geoLocation: { value: boolean } }) => state.geoLocation.value

export const { setGeoLocation } = geoLocationSlice.actions;

export default geoLocationSlice.reducer;
