import React, { useState } from 'react'

export default function FollowBtn() {
  // 追蹤 css 狀態
  const [isTrack, setIsTrack] = useState(true)

  return (
    <div>
      {isTrack ? (
        <button
          type="button"
          className="border border-primary text-primary px-8 py-3 w-[114px] rounded-md md:px-6 md:py-2"
          onClick={() => {
            setIsTrack(!isTrack)
          }}
        >
          追蹤中
        </button>
      ) : (
        <button
          type="button"
          className="border border-transparent bg-primary text-white px-8 py-3 w-[114px] rounded-md md:px-6 md:py-2"
          onClick={() => {
            setIsTrack(!isTrack)
          }}
        >
          追蹤
        </button>
      )}
    </div>
  )
}
