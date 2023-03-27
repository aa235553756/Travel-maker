import React from 'react'
import { AiFillEye } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'
import LikeBtn from './button/LikeBtn'

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
        <span className="mr-2">{view}</span>
        <span className="mr-2">|</span>
        <div className="mr-2 leading-4">
          <LikeBtn />
        </div>
        <span className="mr-2">{like}</span>
        <span className="mr-2">|</span>
        <FaRegCommentDots className="mr-2" />
        <span className="mr-2">{comment}</span>
      </div>
    </div>
  )
}
