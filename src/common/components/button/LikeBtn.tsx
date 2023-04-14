import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

export default function LikeBtn() {
  // like css 狀態
  const [isLike, setIsLike] = useState(true)
  
  return (
    <button
      type="button"
      onClick={() => {
        setIsLike(!isLike)
      }}
    >
      {isLike ? <AiFillHeart className="text-highlight" /> : <AiOutlineHeart />}
    </button>
  )
}
