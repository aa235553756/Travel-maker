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
import { useDispatch } from 'react-redux'
import { addNotifiData, setNotifiData } from '@/redux/notifiSlice'

function App({ Component, pageProps }: AppProps) {
  const token = getCookie('auth')
  const dispatch = useDispatch()

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
    console.log('user frist Enter Website')

    // 第一次撈通知,或重新登入
    if (token !== undefined) {
      getNotifications()
      // setTimeout(async () => {
      //   console.log(5000)

      //   const res = await fetch(
      //     'https://travelmaker.rocket-coding.com/api/users/notifications/1',
      //     requestOptions
      //   )
      //   const resJSON = await res.json()

      //   dispatch(addNotifiData(resJSON)) //要一個新的dispatch
      // }, 5000)
    }

    async function getNotifications() {
      try {
        const res = await fetch(
          'https://travelmaker.rocket-coding.com/api/users/notifications/1',
          requestOptions
        )
        const resJSON = await res.json()

        console.log('resJSON', resJSON)

        dispatch(setNotifiData(resJSON))
      } finally {
        // finally
      }
    }
    // const intervalId = setInterval(() => {
    //   console.log(5000)
    // }, 5000)

    // return () => {
    //   clearInterval(intervalId)
    // }
  }, [dispatch, token])

  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default wrapper.withRedux(App)
