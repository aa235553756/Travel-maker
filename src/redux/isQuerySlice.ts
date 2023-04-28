import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const isQuerySlice = createSlice({
  name: 'isQuery',
  initialState,
  reducers: {
    setIsQuery: (state, action) => {
      state.value = action.payload
      return state
    },
  },

});

export const getIsQuery = (state: { isQuery: { value: boolean } }) => state.isQuery.value
export const { setIsQuery } = isQuerySlice.actions;

export default isQuerySlice.reducer;
