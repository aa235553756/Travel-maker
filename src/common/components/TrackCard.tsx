import React, { useState } from 'react'

interface TrackCardProps {
  poster: string
  posts: number
  fans: number
  trackers: number
}

const TrackCard: React.FC<TrackCardProps> = ({
  poster,
  posts,
  fans,
  trackers,
}) => {
  // 追蹤 css 狀態
  const [isTrack, setIsTrack] = useState(false)
  const trackState = () => {
    setIsTrack(!isTrack)
  }
  return (
    <div className="w-full border rounded-lg lg:w-[calc(50%-12px)] lg:even:!mt-0 lg:odd:!ml-0">
      <div className="bg-[#ccc] h-[240px] rounded-t-lg">
        <div className="p-10">
          <div className="flex flex-col space-y-9">
            <div className="flex justify-center items-center space-x-7">
              <div className="w-[58px] h-[58px] rounded-full bg-[#d7d7d7]"></div>
              <span>{poster}</span>
            </div>
            {/* 追蹤與取消追蹤 */}
            {isTrack ? (
              <button
                className="bg-[#d7d7d7] px-7 py-2 block mx-auto w-[104px]"
                onClick={() => {
                  trackState()
                }}
              >
                追蹤中
              </button>
            ) : (
              <button
                className="border border-black px-7 py-2 block mx-auto w-[104px]"
                onClick={() => {
                  trackState()
                }}
              >
                追蹤
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="py-10">
        <ul className="flex justify-center">
          <li className="text-center px-10">
            <p>{posts}</p>
            <p>遊記</p>
          </li>
          <li className="text-center border-x-[1px] px-10">
            <p>{fans}</p>
            <p>粉絲</p>
          </li>
          <li className="text-center px-10">
            <p>{trackers}</p>
            <p>追蹤</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TrackCard