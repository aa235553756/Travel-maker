import React, { useState } from 'react'
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md'

export default function CollectBtn() {
  // 收藏 css 狀態
  const [isCollect, setIsCollect] = useState(true)

  return (
    <button
      type="button"
      className="bg-glass text-primary rounded-full p-2 w-[36px] h-[36px]"
      onClick={() => {
        setIsCollect(!isCollect)
      }}
    >
      {isCollect ? (
        <MdBookmark className="text-primary text-xl" />
      ) : (
        <MdBookmarkBorder className="text-xl" />
      )}
    </button>
  )
}
