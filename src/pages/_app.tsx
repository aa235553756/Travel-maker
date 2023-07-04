import '@/styles/globals.css'
import '@/styles/upload.css'
import '@/styles/slick.css'
import '@/styles/calendar.css'
import type { AppProps } from 'next/app'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Header from './../common/components/Header'
import Footer from './../common/components/Footer'
import wrapper from '@/redux/wrapper'
import { useEffect } from 'react'
import { getCookie } from 'cookies-next'
import { useDispatch, useSelector } from 'react-redux'
import {
  getNewNotifiData,
  resetNotifiData,
  resetPage,
  setIsMoreDataEnd,
  setNotifiData,
} from '@/redux/notifiSlice'
import LoadingAnimate from '@/common/components/LoadingAnimate'
import { useRouter } from 'next/router'
import { getIsLoading, setIsLoading } from '@/redux/loadingSlice'

function App({ Component, pageProps }: AppProps) {
  const isLoading = useSelector(getIsLoading)
  const token = getCookie('auth')
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(() => {
      return
    })
  }, [])

  useEffect(() => {
    const token = getCookie('auth')
    const myHeaders = new Headers()
    if (token !== undefined) {
      myHeaders.append('Authorization', String(token))
    }
    const requestOptions = {
      method: 'Get',
      headers: myHeaders,
    }
    // console.log('第一次使用者進入網站,以及每次重登token被改變時')

    // 第一次撈通知,或重新登入,設置沒有token時return防止繼續撈資料
    if (token !== undefined) {
      dispatch(resetPage())
      dispatch(setIsMoreDataEnd(false))
      getNotifications()
    } else {
      return
    }

    async function getNotifications() {
      try {
        const res = await fetch(
          'https://travelmaker.rocket-coding.com/api/users/notifications/1',
          requestOptions
        )
        if (res.status === 400) {
          dispatch(resetNotifiData()) //防止舊帳號與第一次新帳號的通知重疊
          return
        }
        const resJSON = await res.json()
        // console.log('resJSON', resJSON)

        dispatch(setNotifiData(resJSON))
      } finally {
        // finally
      }
    }
    const second = 10000
    const intervalId = setInterval(async () => {
      try {
        const res = await fetch(
          'https://travelmaker.rocket-coding.com/api/users/notifications/1',
          requestOptions
        )
        if (res.status === 400) {
          dispatch(resetNotifiData()) //防止舊帳號與第一次新帳號的通知重疊
          return
        }
        const resJSON = await res.json()

        console.log(second, '每10秒重新取得通知資料')

        dispatch(getNewNotifiData(resJSON))
      } finally {
        // finally
      }
    }, second)

    return () => {
      clearInterval(intervalId)
    }
  }, [dispatch, token])

  useEffect(() => {
    dispatch(setIsLoading(false))
  }, [dispatch, router])

  return (
    <div>
      <LoadingAnimate isLoading={isLoading} />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default wrapper.withRedux(App)
