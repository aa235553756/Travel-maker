import '@/styles/globals.css'
import '@/styles/upload.css'
import type { AppProps } from 'next/app'
import Header from './../common/components/Header'
import Footer from './../common/components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}
