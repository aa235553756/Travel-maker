import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

export default function LikeBtn() {
  // like css 狀態
  const [isLike, setIsLike] = useState(false)
  const likeState = () => {
    setIsLike(!isLike)
  }
  return (
    <button type="button"
      onClick={() => {
        likeState()
      }}
    >
      {isLike ? <AiFillHeart className="text-black" /> : <AiOutlineHeart />}
    </button>
  )
}
