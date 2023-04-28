import { Html, Head, Main, NextScript } from 'next/document'

// Server在跑
export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
