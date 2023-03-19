import React, { useState } from 'react'
import { BsHeart, BsFillSuitHeartFill, BsHandThumbsUp } from 'react-icons/bs'
import { AiFillEye } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'

interface BlogCardProps {
  showCollect: boolean
  blogName: string
  poster: string
  time: string
}

const BlogCard: React.FC<BlogCardProps> = ({
  showCollect,
  blogName,
  poster,
  time,
}) => {
  // 收藏 css 狀態
  const [isCollect, setIsCollect] = useState(false)
  const collectState = () => {
    setIsCollect(!isCollect)
  }
  return (
    <div className="border rounded-lg w-full lg:w-[calc(50%-12px)] lg:even:!mt-0 lg:odd:!ml-0">
      <div className="bg-[#ccc] h-[240px] rounded-t-lg">
        <div className="flex justify-end p-4">
          {/* 顯示收藏 */}
          {showCollect && (
            <button
              className="border border-black rounded-full p-2 w-[34px] h-[34px]"
              onClick={() => {
                collectState()
              }}
            >
              {isCollect ? (
                <BsFillSuitHeartFill className="text-red-700" />
              ) : (
                <BsHeart />
              )}
            </button>
          )}
        </div>
      </div>
      <div className="p-4">
        <p className="text-lg mb-3">{blogName}</p>
        <div className="flex items-center space-x-6 mb-2">
          <div className="flex item-center space-x-2">
            <div className="w-[20px] h-[20px] rounded-full bg-[#ccc]"></div>
            <span className="text-sm">{poster} 發布一篇文章</span>
          </div>
          <span className="text-sm">{time}</span>
        </div>
        <div className="flex">
          <div className="flex items-center">
            <AiFillEye className="mr-2" />
            <span className="mr-2">156</span>
            <span className="mr-2">|</span>
            <BsHandThumbsUp className="mr-2" />
            <span className="mr-2">156</span>
            <span className="mr-2">|</span>
            <FaRegCommentDots className="mr-2" />
            <span className="mr-2">42</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
