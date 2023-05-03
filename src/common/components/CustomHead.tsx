import React from 'react'
import Head from 'next/head'

export default function CustomHead({
  title,
  h1,
  description,
}: {
  title?: string
  h1?: string
  description?: string
}) {
  const defaultTitle = 'TravelMaker'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={
            description ||
            '還在為了聚會行程煩惱嗎？ Travel Maker 五秒鐘搞定行程！'
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:image" content="/blurLogo.png" />
        <meta
          property="og:description"
          content={
            description ||
            '還在為了聚會行程煩惱嗎？ Travel Maker 五秒鐘搞定行程！'
          }
        />
        <link rel="icon" href="/Group 340.png" />
      </Head>
      <h1 className="hidden">
        {h1 || '還在為了聚會行程煩惱嗎？ Travel Maker 五秒鐘搞定行程！'}
      </h1>
    </>
  )
}
