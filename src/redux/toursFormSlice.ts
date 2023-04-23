import { createSlice } from '@reduxjs/toolkit';

// Redux 計算器 範例
const initialState = { value: {} }

export const toursFormSlice = createSlice({
  name: 'toursForm',
  initialState,
  reducers: {
    saveForm: (state, action) => {
      state.value = action.payload
      return state
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(HYDRATE, (state, action) => {

  //     state = action.payload
  //     return state
  //   });
  // },
});

export const { saveForm } = toursFormSlice.actions;

export default toursFormSlice.reducer;


// 需要在getServerSideProp時就改變state值，然後要去找 extraReducer怎麼寫
// export const getServerSideProps = wrapper.getServerSideProps((store) => () => {
// ...
// return {props:{}}
// })