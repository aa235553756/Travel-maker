import CustomHead from '@/common/components/CustomHead'
import { Html, Main, NextScript } from 'next/document'

// Server在跑
export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <CustomHead />
      {/* <Head /> */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
