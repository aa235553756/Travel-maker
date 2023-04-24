import { randomTourProp } from '@/util/types';
import { createSlice } from '@reduxjs/toolkit';

// Redux 計算器 範例
const initialState = {
  value: Array(8)
    .fill('')
    .map(() => {
      return {
        ImageUrl: '/logo.png',
        AttractionName: '景點名稱',
      }
    }),
}

export const randomTourSlice = createSlice({
  name: 'randomTour',
  initialState,
  reducers: {
    saveTours: (state, action) => {
      state.value = action.payload
      return state
    },
  },

});

export const getRandomTour = (state: { randomTour: { value: randomTourProp[] } }) => state.randomTour.value
export const { saveTours } = randomTourSlice.actions;

export default randomTourSlice.reducer;

