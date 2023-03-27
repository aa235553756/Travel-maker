import React, { useState } from 'react'

export default function FollowBtn() {
  // 追蹤 css 狀態
  const [isTrack, setIsTrack] = useState(false)
  const trackState = () => {
    setIsTrack(!isTrack)
  }
  return (
    <div>
      {isTrack ? (
        <button type="button"
          className="bg-[#d7d7d7] border border-transparent px-7 py-2 w-[110px]"
          onClick={() => {
            trackState()
          }}
        >
          追蹤中
        </button>
      ) : (
        <button type="button"
          className="border border-black px-7 py-2 w-[110px]"
          onClick={() => {
            trackState()
          }}
        >
          追蹤
        </button>
      )}
    </div>
  )
}
