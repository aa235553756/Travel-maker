import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Redux 計算器 範例
const initialState = Array(8)
  .fill('')
  .map(() => {
    return {
      ImageUrl:
        'https://fakeimg.pl/200x100/?retina=1&text=示範圖&font=noto',
      AttractionName: '景點名稱',
    }
  })

export const randomTourSlice = createSlice({
  name: 'randomTour',
  initialState,
  reducers: {
    saveTours: (state, action) => {

      state = action.payload.value
      return state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {

      state = action.payload
      return state
    });
  },
});

export const { saveTours } = randomTourSlice.actions;

export default randomTourSlice.reducer;


// 需要在getServerSideProp時就改變state值，然後要去找 extraReducer怎麼寫
// export const getServerSideProps = wrapper.getServerSideProps((store) => () => {
// ...
// return {props:{}}
// })