import React from 'react'
import { BsHeart } from 'react-icons/bs'

export default function SeeOthers() {
  return (
    <div className="container">
      <h3>看別人怎麼玩</h3>

      {/* 這是地圖 */}
      <div className="bg-[#C4C4C4] h-[324px]"></div>
      {/* 這是別人行程卡片 */}
      <ul>
        <li>
          <h4>好瘋狂熱血青年</h4>
          <div>
            <span>城市走走</span>
            <div className="flex items">
              <BsHeart className="text-lg" />
              <span>100</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
