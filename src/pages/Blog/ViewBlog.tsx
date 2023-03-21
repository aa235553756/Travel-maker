import React from 'react'
import ViewAttr from '@/modules/BlogPage/components/ViewAttr'
import {
  BsHandThumbsUp,
  BsGeoAltFill,
} from 'react-icons/bs'
import { AiFillEye, AiOutlineMore } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'

export default function PostBlog() {
  return (
    <div className="container">
      {/* 圖片 */}
      <div className="w-full mx-auto h-[318px] bg-[#d7d7d7] relative mt-7 mb-[60px] lg:w-2/3"></div>

      <div className="w-full mx-auto lg:w-1/2">
        {/* 用戶 */}
        <div className="flex item-center space-x-5 mb-7">
          <div className="w-[60px] h-[60px] rounded-full bg-[#ccc]"></div>
          <div className="flex flex-col space-y-2">
            <span className="text-lg">安妮亞</span>
            <span>2022/03/05發布</span>
            <div className="flex">
              <div className="flex items-center">
                <AiFillEye className="mr-2" />
                <span className="mr-2">156</span>
                <span className="mr-2">|</span>
                <BsHandThumbsUp className="mr-2" />
                <span className="mr-2">156</span>
                <span className="mr-2">|</span>
                <FaRegCommentDots className="mr-2" />
                <span className="mr-2">42</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="mb-8" />

        {/* 遊記資訊 */}
        <div className="flex flex-col space-y-4 mb-[72px]">
          <h2 className="text-lg">瘋狂熱血少年團</h2>
          <div className="flex items-center space-x-2">
            <BsGeoAltFill />
            <span>臺北市大安區、信義區</span>
          </div>
          <div className="flex space-x-2">
            <div className="border rounded-full px-4 py-2">城市走走</div>
            <div className="border rounded-full px-4 py-2">放鬆療癒</div>
          </div>
        </div>

        {/* 景點資訊 */}
        <div className="flex flex-col space-y-10 mb-[60px]">
          <ViewAttr
            attractName="大安森林公園"
            content="吃飽後，我們便搭車來到東京鐵塔周遭，這裡可是有好幾個必拍的景點唷！首先抵達的是增上寺，它位於港區芝公園內，與東京鐵塔比鄰、走路只要五分鐘，是東京人每年元旦新年必參拜的聖地，還會在此聽「除夜之鐘」108響鐘聲、倒數跨年並且祈願未來一年平安健康。"
          />
          <ViewAttr
            attractName="中正紀念堂"
            content="吃飽後，我們便搭車來到東京鐵塔周遭，這裡可是有好幾個必拍的景點唷！首先抵達的是增上寺，它位於港區芝公園內，與東京鐵塔比鄰、走路只要五分鐘，是東京人每年元旦新年必參拜的聖地，還會在此聽「除夜之鐘」108響鐘聲、倒數跨年並且祈願未來一年平安健康。"
          />
          <ViewAttr
            attractName="松山文創園區"
            content="吃飽後，我們便搭車來到東京鐵塔周遭，這裡可是有好幾個必拍的景點唷！首先抵達的是增上寺，它位於港區芝公園內，與東京鐵塔比鄰、走路只要五分鐘，是東京人每年元旦新年必參拜的聖地，還會在此聽「除夜之鐘」108響鐘聲、倒數跨年並且祈願未來一年平安健康。"
          />
          <ViewAttr
            attractName="台北101"
            content="吃飽後，我們便搭車來到東京鐵塔周遭，這裡可是有好幾個必拍的景點唷！首先抵達的是增上寺，它位於港區芝公園內，與東京鐵塔比鄰、走路只要五分鐘，是東京人每年元旦新年必參拜的聖地，還會在此聽「除夜之鐘」108響鐘聲、倒數跨年並且祈願未來一年平安健康。"
          />
        </div>

        {/* 留言 */}
        <div>
          <h2 className="text-lg mb-7">留言(0)</h2>
          <div className="flex items-center space-x-4 mb-10">
            <div className="w-[56px] h-[56px] bg-[#d7d7d7] rounded-full"></div>
            <input
              type="text"
              placeholder="請留言"
              className="border px-3 py-4 grow"
            />
            <button className="px-2 py-4 border">送出</button>
          </div>
          <hr className="mb-10" />
          <h2 className="text-lg mb-7">其他留言(2)</h2>
          <div className="flex flex-col space-y-6 pb-[100px]">
            <div className="bg-[#d7d7d7] rounded-lg px-5 py-4 w-full">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#ccc]"></div>
                  <div className="flex flex-col">
                    <div className="flex space-x-5">
                      <p className="text-sm">小熊軟糖</p>
                      <a className="font-bold text-sm">回覆</a>
                    </div>
                    <p className="text-sm">2023.03.11</p>
                  </div>
                </div>
                <AiOutlineMore />
              </div>
              <div className="pl-[48px]">
                介紹超仔細，風景好美喔！照片拍的好好看。介紹超仔細，風景好美喔！照片拍的好好看。
              </div>
            </div>
            <div className="bg-[#d7d7d7] rounded-lg px-5 py-4 w-full">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#ccc]"></div>
                  <div className="flex flex-col">
                    <div className="flex space-x-5">
                      <span className="text-sm">小熊軟糖</span>
                      <a className="font-bold text-sm">回覆</a>
                    </div>
                    <p className="text-sm">2023.03.11</p>
                  </div>
                </div>
                <AiOutlineMore />
              </div>
              <div className="pl-[48px] mb-2">
                介紹超仔細，風景好美喔！照片拍的好好看。介紹超仔細，風景好美喔！照片拍的好好看。
              </div>

              {/* 回覆 */}
              <div className="flex items-center space-x-2 pl-[48px]">
                <div className="w-[40px] h-[40px] rounded-full bg-[#ccc]"></div>
                <div className="flex flex-col">
                  <div className="flex space-x-5">
                    <span className="text-sm">老頭阿迪</span>
                    <span className="text-sm">三天前</span>
                  </div>
                  <p className="text-sm">感謝留言，歡迎追蹤。</p>
                </div>
              </div>
            </div>
            <div className="bg-[#d7d7d7] rounded-lg px-5 py-4 w-full">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#ccc]"></div>
                  <div className="flex flex-col">
                    <div className="flex space-x-5">
                      <p className="text-sm">使者大臣</p>
                      <a className="font-bold text-sm">回覆</a>
                    </div>
                    <p className="text-sm">2023.03.11</p>
                  </div>
                </div>
              </div>
              <div className="pl-[48px]">
                介紹超仔細，風景好美喔！照片拍的好好看。介紹超仔細，風景好美喔！照片拍的好好看。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
