import { NotificationResponseType } from '@/util/NotificationDataType'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// 這裡有顯示state
const initialState = {
  page: 2,
  isShow: true, //控制block state
  data: {
    Status: false,
    Counts: 0,
    NotificationData: [
      // {
      //   text: '預設slice',
      //   isNew: true,
      //   isRead: false,
      //   initDate: '1天前',
      //   profilePicture: '',
      //   link: 'http',
      //   NotificationId: 20000,
      // },
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
    setNotifiData: (state, action) => {
      state.data = action.payload
    },
    addNotifiData: (state, action) => {
      const prev = state.data.NotificationData
      const payloadAry = action.payload.NotificationData

      const plus = prev.filter(
        (itemB: { NotificationId: number }) =>
          !payloadAry.some(
            (itemA: { NotificationId: number }) =>
              itemA.NotificationId === itemB.NotificationId
          )
      )

      const merged = [...plus, ...payloadAry]

      state.data = {
        ...action.payload,
        NotificationData: merged,
      }
    },
    setPage: (state) => {
      state.page += 1
    },
    resetPage: (state) => {
      state.page = 2
    },
    resetNotifiData: (state) => {
      state.data = initialState.data
    },
    clearIsNew: (state, action) => {
      state.data.NotificationData = state.data.NotificationData.filter(
        (item: { NotificationId: number }) => {
          return item.NotificationId !== action.payload
        }
      )
    },
    getNewNotifiData: (state, action) => {
      const a = state.data.NotificationData
      const b = action.payload.NotificationData

      const newA = a.filter(
        (itemA: { NotificationId: number }) =>
          !b.some(
            (itemB: { NotificationId: number }) =>
              itemB.NotificationId === itemA.NotificationId
          )
      )
      const merged = [...b, ...newA]

      state.data = {
        ...action.payload,
        NotificationData: merged,
      }
    },
    changeStatus: (state) => {
      state.data.Status = false
    },
  },
})

export const getNotifi = (state: { notifi: { isShow: boolean } }) =>
  state.notifi
export const getIsShow = (state: { notifi: { isShow: boolean } }) =>
  state.notifi.isShow
export const getData = (state: {
  notifi: { data: NotificationResponseType }
}) => state.notifi.data
export const getPage = (state: { notifi: { page: number } }) =>
  state.notifi.page

export const { setIsShow } = notifiSlice.actions
export const { setNotifiData } = notifiSlice.actions
export const { addNotifiData } = notifiSlice.actions
export const { setPage } = notifiSlice.actions
export const { resetPage } = notifiSlice.actions
export const { resetNotifiData } = notifiSlice.actions
export const { clearIsNew } = notifiSlice.actions
export const { getNewNotifiData } = notifiSlice.actions
export const { changeStatus } = notifiSlice.actions

export default notifiSlice.reducer
