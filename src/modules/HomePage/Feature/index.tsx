import React from 'react'
import { BsArrowRepeat, BsHeart } from 'react-icons/bs'
import { MdOutlineMenuBook } from 'react-icons/md'

export default function Feature() {
  return (
    <div className="container py-[60px] justify-center items-center lg:pt-[100px] lg:pb-[110px] lg:flex">
      <div className="mb-10 flex-shrink-0 order-1 lg:w-1/3">
        <h3 className="text-[22px] mb-2 font-bold md:mb-6 lg:text-[30px] lg:mb-10">
          我們可以幫你...
        </h3>
        <p className="text-[#737373] mb-7 lg:mb-5 lg:text-xl">
          跟朋友聚會，事前還在燒腦規劃嗎？
          <br />
          出門在外，還在搜尋附近有甚麼好玩好吃的嗎？
          <br />
          處在陌生城市想要到處踩點，還在一籌莫展嗎？
        </p>
        <p className="text-[#737373] lg:text-xl">
          以上問題聚會趣都可以幫你解決
          <br />
          規劃行程不必愁，動動手指開心去！
        </p>
      </div>
      <ul className="flex flex-wrap  space-x-4 space-y-4 md:justify-evenly md:space-x-0 lg:justify-start lg:space-x-6 lg:space-y-10 lg:max-w-[552px] lg:mr-6">
        <li className="flex bg-[#E7E7E7] max-w-[264px] w-[calc(50%-8px)] pt-5 px-3 aspect-square md:items-center md:px-12  md:h-[264px]">
          <div>
            {/* 不是這個icon喔 */}
            <BsArrowRepeat className="text-[30px] md:text-5xl mb-3" />
            <h4 className="mb-2">隨機產生器</h4>
            <p className="text-[#737373] text-sm">
              想不到去哪裡？只要選擇篩選器內容就能幫您客製專屬的
              <span className="hidden min-[378px]:inline">隨機行程</span>
              <span className="min-[378px]:hidden">...</span>。
            </p>
          </div>
        </li>
        <li className="flex bg-[#E7E7E7] max-w-[264px] w-[calc(50%-8px)] pt-5 px-3 aspect-square !mt-0 md:items-center md:px-12  md:h-[264px]">
          <div>
            <BsHeart className="text-[30px] md:text-5xl mb-3" />
            <h4 className="mb-2">加入收藏</h4>
            <p className="text-[#737373] text-sm">
              滿滿的的景點行程眼花撩亂了嗎？收藏功能讓你聚會不再
              <span className="hidden min-[378px]:inline">靈感枯竭</span>
              <span className="min-[378px]:hidden">...</span>。
            </p>
          </div>
        </li>
        <li className="flex bg-[#E7E7E7] max-w-[264px] w-[calc(50%-8px)] pt-5 px-3 aspect-square !ml-0 md:items-center md:px-12  md:h-[264px]">
          <div>
            {/* 不是這個icon喔 */}
            <BsArrowRepeat className="text-[30px] md:text-5xl mb-3" />
            <h4 className="mb-2">編輯行程</h4>
            <p className="text-[#737373] text-sm">
              隨機產生行程後，想要變更行程嗎？動動手指便能幫你完
              <span className="hidden min-[378px]:inline">成</span>
              <span className="min-[378px]:hidden">...</span>。
            </p>
          </div>
        </li>
        <li className="flex bg-[#E7E7E7] max-w-[264px] w-[calc(50%-8px)] pt-5 px-3 aspect-square md:items-center md:px-12  md:h-[264px]">
          <div>
            <MdOutlineMenuBook className="text-[30px] md:text-5xl mb-3" />
            <h4 className="mb-2">部落格</h4>
            <p className="text-[#737373] text-sm">
              只能排行程？我們還能還能讓你記錄生活、抒發情感及
              <span className="hidden min-[378px]:inline">分享資訊</span>
              <span className="min-[378px]:hidden">...</span>。
            </p>
          </div>
        </li>
      </ul>
    </div>
  )
}
