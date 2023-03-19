import React from 'react'
import { BsFillStarFill, BsStar } from 'react-icons/bs'
import { MdModeEdit, MdDelete } from 'react-icons/md'

interface TrackCardProps {
  user: string
  attract: string
  content: string
}

const CommentCard: React.FC<TrackCardProps> = ({ user, attract, content }) => {
  return (
    <div className="border rounded-lg px-5 py-4 w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-[40px] h-[40px] rounded-full bg-[#d7d7d7]"></div>
          <div className="flex flex-col">
            <p className="text-sm">{user}</p>
            <p className="text-sm">{attract}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="border rounded-full p-2">
            <MdModeEdit />
          </button>
          <button className="border rounded-full p-2">
            <MdDelete />
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-3">
        <BsFillStarFill />
        <BsFillStarFill />
        <BsFillStarFill />
        <BsFillStarFill />
        <BsStar />
        <span>5個月前</span>
      </div>
      <div>{content}</div>
    </div>
  )
}

export default CommentCard
