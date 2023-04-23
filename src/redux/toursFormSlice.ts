import { geoDefaultValueProp } from '@/util/types';
import { createSlice } from '@reduxjs/toolkit';

// Redux 計算器 範例
const initialState = { value: undefined }

export const toursFormSlice = createSlice({
  name: 'toursForm',
  initialState,
  reducers: {
    saveForm: (state, action) => {
      state.value = action.payload
      return state
    },
  },
});

export const getToursForm = (state: { toursForm: { value: geoDefaultValueProp | undefined } }) =>
  state.toursForm.value
export const { saveForm } = toursFormSlice.actions;

export default toursFormSlice.reducer;