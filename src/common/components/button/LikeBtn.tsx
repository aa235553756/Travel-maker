import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

export default function LikeBtn({
  likeStatus,
  onClick1,
}: {
  likeStatus: boolean
  onClick1?: () => void
}) {
  // like css 狀態
  const [isLike, setIsLike] = useState(likeStatus)

  return (
    <button
      type="button"
      onClick={() => {
        onClick1 ? setIsLike(!isLike) : null
        onClick1 ? onClick1() : null
        // if (onClick1) {
        //   setIsLike(!isLike)
        //   onClick1()
        // }
      }}
    >
      {isLike ? <AiFillHeart className="text-highlight" /> : <AiOutlineHeart />}
    </button>
  )
}
