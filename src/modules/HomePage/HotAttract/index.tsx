import React from 'react'
import { BsFillStarFill, BsStar, BsGeoAltFill } from 'react-icons/bs'

export default function HotAttract() {
  return (
    <div>
      <div className="container">
        <div className="pb-[100px]">
          <h2 className="font-bold text-[22px] mb-8">尚夯ㄟ景點</h2>
          <ul className="flex flex-col space-y-5 lg:flex-row lg:space-x-4">
            <li className="w-full border lg:w-1/3">
              <div className="bg-[#ccc] h-[210px]">我是漂亮的圖片</div>
              <div className="px-7 my-5">
                <div className="flex items-center mb-2 space-x-3">
                  <BsGeoAltFill />
                  <p className="font-bold">臺北市 大安區</p>
                </div>
                <p className="text-sm mb-3">大安森林公園</p>
                <p className="mb-3 flex space-x-2">
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsStar />
                </p>
                <div className="flex text-[14px] space-x-2 mb-7">
                  <span className="bg-[#ccc] px-3 py-1">城市走走</span>
                  <span className="bg-[#ccc] px-3 py-1">放鬆療癒</span>
                </div>
                <button className="bg-[#ccc] px-11 py-4 mx-auto block">
                  查看詳情
                </button>
              </div>
            </li>
            <li className="w-full border lg:w-1/3 lg:!mt-0">
              <div className="bg-[#ccc] h-[210px]">我是漂亮的圖片</div>
              <div className="px-7 my-5">
                <div className="flex items-center mb-2 space-x-3">
                  <BsGeoAltFill />
                  <p className="font-bold">臺北市 大安區</p>
                </div>
                <p className="text-sm mb-3">大安森林公園</p>
                <p className="mb-3 flex space-x-2">
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsStar />
                </p>
                <div className="flex text-[14px] space-x-2 mb-7">
                  <span className="bg-[#ccc] px-3 py-1">城市走走</span>
                  <span className="bg-[#ccc] px-3 py-1">放鬆療癒</span>
                </div>
                <button className="bg-[#ccc] px-11 py-4 mx-auto block">
                  查看詳情
                </button>
              </div>
            </li>
            <li className="w-full border lg:w-1/3 lg:!mt-0">
              <div className="bg-[#ccc] h-[210px]">我是漂亮的圖片</div>
              <div className="px-7 my-5">
                <div className="flex items-center mb-2 space-x-3">
                  <BsGeoAltFill />
                  <p className="font-bold">臺北市 大安區</p>
                </div>
                <p className="text-sm mb-3">大安森林公園</p>
                <p className="mb-3 flex space-x-2">
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsStar />
                </p>
                <div className="flex text-[14px] space-x-2 mb-7">
                  <span className="bg-[#ccc] px-3 py-1">城市走走</span>
                  <span className="bg-[#ccc] px-3 py-1">放鬆療癒</span>
                </div>
                <button className="bg-[#ccc] px-11 py-4 mx-auto block">
                  查看詳情
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
