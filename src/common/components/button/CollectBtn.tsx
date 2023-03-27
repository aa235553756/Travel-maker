import React, { useState } from 'react'
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md'

export default function CollectBtn() {
  // 收藏 css 狀態
  const [isCollect, setIsCollect] = useState(false)
  const collectState = () => {
    setIsCollect(!isCollect)
  }
  return (
    <button type="button"
      className="border border-black rounded-full p-2 w-[34px] h-[34px]"
      onClick={() => {
        collectState()
      }}
    >
      {isCollect ? (
        <MdBookmark className="text-black" />
      ) : (
        <MdBookmarkBorder />
      )}
    </button>
  )
}
