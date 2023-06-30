import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// 這裡有顯示state
const initialState = {
  page: 1,
  isShow: true,
  data: {
    Status: true,
    Counts: 12,
    NotificationData: [
      {
        text: '預設',
        isNew: true,
        isRead: false,
        initDate: '1天前',
        profilePicture: '',
        link: 'http',
      },
    ],
  },
}

export const notifiSlice = createSlice({
  name: 'notifi',
  initialState,
  reducers: {
    setIsShow: (state, action: PayloadAction<boolean>) => {
      state.isShow = action.payload
    },
    setNotifiData: (state, action: PayloadAction<[]>) => {
      state.data = action.payload
    },
    addNotifiData: (state, action: PayloadAction<[]>) => {
      // const a = [{ id: 1, state: "new" }];
      // const b = [{ id: 1 }, { id: 3 }];
      const prev = state.data.NotificationData
      const payloadAry = action.payload.NotificationData

      const newAry = [...prev, ...payloadAry]
      console.log('newAry', newAry)

      payloadAry.push({ NotificationId: 20000 })
      const newPrevAry = prev.filter(
        (itemB) =>
          !payloadAry.some(
            (itemA) => itemA.NotificationId === itemB.NotificationId
          )
      )

      console.log('newPrevAry', newPrevAry)

      const merged = [...newPrevAry, ...payloadAry]
      console.log('merged', merged)

      state.data = {
        ...action.payload,
        NotificationData: merged,
      }
    },
    setPage: (state) => {
      state.page += 1
    },
  },
})

export const getNotifi = (state: { notifi: { isShow: boolean } }) =>
  state.notifi
export const getIsShow = (state: { notifi: { isShow: boolean } }) =>
  state.notifi.isShow
export const getData = (state: { notifi: { data: [] } }) => state.notifi.data
export const getPage = (state: { notifi: { page: number } }) =>
  state.notifi.page

export const { setIsShow } = notifiSlice.actions
export const { setNotifiData } = notifiSlice.actions
export const { addNotifiData } = notifiSlice.actions
export const { setPage } = notifiSlice.actions

export default notifiSlice.reducer

// 需要在getServerSideProp時就改變state值，然後要去找 extraReducer怎麼寫
// export const getServerSideProps = wrapper.getServerSideProps((store) => () => {
// ...
// return {props:{}}
// })
