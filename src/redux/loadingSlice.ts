import { createSlice } from '@reduxjs/toolkit';

// Redux 計算器 範例
const initialState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },

});

export const getIsLoading = (state: { loading: { isLoading: boolean } }) =>
  state.loading.isLoading
export const { setIsLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
