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

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(() => {
      return
    })
  }, [])

  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default wrapper.withRedux(App)
