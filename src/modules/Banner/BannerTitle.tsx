import React from 'react'
export default function BannerTitle({}) {
  return (
    <>
      <h2 className="text-[28px] md:text-[40px] xl:text-5xl mb-6 md:mb-0 whitespace-nowrap tracking-[-.75px] md:tracking-normal xl:leading-normal ">
        還在為了聚會行程煩惱嗎？
        <br />
        <span className="max-[410px]:text-[23px] font-bold">Travel Maker </span>
        五秒鐘搞定行程！
      </h2>
      <h3
        id="bannerTitle"
        className="text-[22px] md:text-[28px] xl:text-4xl mb-9 md:mb-8 "
      >
        {/* 說走就走，我想要城市走走 */}
      </h3>
    </>
  )
}
