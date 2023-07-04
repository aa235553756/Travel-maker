import React, { ReactNode } from 'react'
import { BsArrowRepeat, BsPencilSquare } from 'react-icons/bs'
import { MdOutlineMenuBook } from 'react-icons/md'
import { FiHeart } from 'react-icons/fi'

export default function Feature() {
  return (
    <div className="container">
      <div className="py-[60px] lg:mx-auto lg:w-10/12 justify-between  items-center lg:pt-[112px] lg:pb-[110px] md:flex">
        <div className="mb-10 md:mb-0 order-1">
          <h3 className="text-[22px] lg:text-4xl mb-3 font-medium lg:mb-10">
            我們可以幫你...
          </h3>
          <p className="text-gray-64 mb-6 lg:mb-4 lg:text-xl">
            跟朋友聚會，事前還在燒腦規劃嗎？
            <br />
            出門在外，還在搜尋附近有甚麼好玩好吃的嗎？
            <br />
            處在陌生城市想要到處踩點，還在一籌莫展嗎？
          </p>
          <p className="text-gray-64 lg:text-xl">
            以上問題聚會趣都可以幫你解決
            <br />
            規劃行程不必愁，動動手指開心去！
          </p>
        </div>
        <ul className="flex md:max-w-[55%] lg:max-w-[552px] -mb-4 lg:-mb-6 flex-wrap md:mr-6">
          <FeatureBlock>
            <BsArrowRepeat className="text-[30px] lg:text-5xl mb-3" />
            <h4 className="mb-2">隨機產生器</h4>
            <p className="text-gray-73 text-sm lg:text-base ">
              想不到去哪裡？只要選擇篩選器內容就能幫您客製專屬的
              <span className="hidden min-[378px]:inline">隨機行程</span>
              <span className="min-[378px]:hidden">...</span>。
            </p>
          </FeatureBlock>
          <FeatureBlock>
            <FiHeart className="text-[30px] lg:text-5xl mb-3" />
            <h4 className="mb-2">加入收藏</h4>
            <p className="text-gray-73 text-sm lg:text-base ">
              滿滿的的景點行程眼花撩亂了嗎？收藏功能讓你聚會不再
              <span className="hidden min-[378px]:inline">靈感枯竭</span>
              <span className="min-[378px]:hidden">...</span>。
            </p>
          </FeatureBlock>
          <FeatureBlock>
            <BsPencilSquare className="text-[30px] lg:text-5xl mb-3" />
            <h4 className="mb-2">編輯行程</h4>
            <p className="text-gray-73 text-sm lg:text-base ">
              隨機產生行程後，想要變更行程嗎？動動手指便能幫你完
              <span className="hidden min-[378px]:inline">成</span>
              <span className="min-[378px]:hidden">...</span>。
            </p>
          </FeatureBlock>
          <FeatureBlock>
            <MdOutlineMenuBook className="text-[30px] lg:text-5xl mb-3" />
            <h4 className="mb-2">部落格</h4>
            <p className="text-gray-73 text-sm lg:text-base ">
              只能排行程？我們還能還能讓你記錄生活、抒發情感及
              <span className="hidden min-[378px]:inline">分享資訊</span>
              <span className="min-[378px]:hidden">...</span>。
            </p>
          </FeatureBlock>
        </ul>
      </div>
    </div>
  )
}

function FeatureBlock({ children }: { children: ReactNode }) {
  return (
    <li className="flex align-baseline mr-4 mb-4 even:mr-0 lg:mr-6 lg:mb-6 border-2 w-[calc(50%-8px)] lg:w-[calc(50%-12px)] pt-5 px-3 lg:py-12 aspect-square lg:px-12 border-primary text-primary rounded-[20px] lg:rounded-xl">
      <div>{children}</div>
    </li>
  )
}
