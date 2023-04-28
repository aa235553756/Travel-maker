import React, { useState } from 'react'
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md'

export default function CollectBtn({
  showCollect,
  onClick1,
}: {
  showCollect: boolean | undefined
  onClick1?: () => void
}) {
  // 收藏 css 狀態
  const [isCollect, setIsCollect] = useState(showCollect)

  return (
    <button
      type="button"
      className="bg-glass text-primary rounded-full p-2 w-[36px] h-[36px] z-20"
      onClick={() => {
        setIsCollect(!isCollect)
        onClick1 ? onClick1() : null
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
