import { createSlice } from '@reduxjs/toolkit';

// Redux 計算器 範例
const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },

});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;


// 需要在getServerSideProp時就改變state值，然後要去找 extraReducer怎麼寫
// export const getServerSideProps = wrapper.getServerSideProps((store) => () => {
// ...
// return {props:{}}
// })