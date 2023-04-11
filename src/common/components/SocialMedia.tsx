import React from 'react'
import { AiFillEye, AiOutlineHeart } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'

export default function SocialMedia({
  view,
  like,
  comment,
}: {
  view: number
  like: number
  comment: number
}) {
  return (
    <div className="flex">
      <div className="flex items-center">
        <AiFillEye className="mr-2" />
        <span className="mr-2 text-[rgba(0,0,0,0.45)]">{view}</span>
        <span className="mr-2 text-[rgba(0,0,0,0.45)]">|</span>
        <AiOutlineHeart className="mr-2" />
        <span className="mr-2 text-[rgba(0,0,0,0.45)]">{like}</span>
        <span className="mr-2 text-[rgba(0,0,0,0.45)]">|</span>
        <FaRegCommentDots className="mr-2" />
        <span className="mr-2 text-[rgba(0,0,0,0.45)]">{comment}</span>
      </div>
    </div>
  )
}
