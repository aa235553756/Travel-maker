import React from 'react'

export default function Footer() {
  return (
    <div className="text-gray-A8 text-center py-6 border-t-[1px] border-gray-E7 md:py-12 md:h-[120px]">
      <div className="container">
        <p className="text-sm md:text-base">
          COPYRIGHT © Travel Maker ALL RIGHTS RESERVED.
        </p>
        <br />
        <span className="text-sm text-gray-D underline">
          本網站上所有的圖片，如果您是版權擁有者，發現本網站上的任何圖片未經您的明確許可使用，請立即與我們聯繫，我們將盡快刪除該圖片或進行其他必要的更正措施。
          <br />
          <span>請郵寄至此 </span>
          <a
            href="mailto:traveltourgogo@gmail.com"
            className="hover:text-primary-dark active:text-primary-tint pb-10 underline"
          >
            traveltourgogo@gmail.com
          </a>
        </span>
      </div>
    </div>
  )
}
