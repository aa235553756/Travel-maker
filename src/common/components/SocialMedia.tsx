import { getCookie } from 'cookies-next'
import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'
import { CustomModal } from './CustomModal'
import router from 'next/router'

export default function SocialMedia({
  id,
  view,
  like,
  comment,
  isLiked,
}: {
  id?: string
  view: number
  like: number
  comment: number
  isLiked?: boolean
}) {
  const token = getCookie('auth')
  const [isLike, setLike] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(like)
  const [isInitialLoad, setInitialLoad] = useState(true)
  const [loginConfirm, setLoginConfirm] = useState(false)

  // 喜歡遊記
  const handleLikeBlog = async (blogGuid: number | string) => {
    if (!token) {
      setLoginConfirm(true)
      //請先登入
      setTimeout(() => {
        router.push('/login')
      }, 2000)
      return
    }
    try {
      //【API】按遊記愛心
      const resLikeBlogData = await fetch(
        `https://travelmaker.rocket-coding.com/api/blogs/${blogGuid}/like`,
        {
          method: 'POST',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const likeBlogData = await resLikeBlogData.json()

      if (resLikeBlogData.ok) {
        setLikeCount(likeCount + 1)
        setLike(true)
      }

      if (!resLikeBlogData.ok) {
        alert(likeBlogData.Message)
      }
      throw new Error('不知名錯誤')
    } catch (error) {}
  }

  // 取消喜歡遊記
  const handleCancelLikeBlog = async (blogGuid: number | string) => {
    if (!token) {
      setLoginConfirm(true)
      //請先登入
      setTimeout(() => {
        router.push('/login')
      }, 2000)
      return
    }
    try {
      //【API】取消遊記愛心
      const resCancelLikeBlogData = await fetch(
        `https://travelmaker.rocket-coding.com/api/blogs/${blogGuid}/like`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const cancelLikeBlogData = await resCancelLikeBlogData.json()

      if (resCancelLikeBlogData.ok) {
        setLikeCount(likeCount - 1)
        setLike(false)
      }

      if (!resCancelLikeBlogData.ok) {
        alert(cancelLikeBlogData.Message)
      }
      throw new Error('不知名錯誤')
    } catch (error) {}
  }

  useEffect(() => {
    if (isInitialLoad) {
      setInitialLoad(false)
    }
  }, [])

  return (
    <div className="flex">
      <div className="flex items-center">
        <AiFillEye className="mr-2" />
        <span className="mr-2 text-[rgba(0,0,0,0.45)]">{view}</span>
        <span className="mr-2 text-[rgba(0,0,0,0.45)]">|</span>
        {isLike || isInitialLoad ? (
          <AiFillHeart
            className="mr-2 text-highlight cursor-pointer"
            onClick={() => {
              setLike(!isLike)
              handleCancelLikeBlog(id ? id : '')
            }}
          />
        ) : (
          <AiOutlineHeart
            className="mr-2 cursor-pointer"
            onClick={() => {
              setLike(!isLike)
              handleLikeBlog(id ? id : '')
            }}
          />
        )}
        <span className="mr-2 text-[rgba(0,0,0,0.45)]">{likeCount}</span>
        <span className="mr-2 text-[rgba(0,0,0,0.45)]">|</span>
        <FaRegCommentDots className="mr-2" />
        <span className="mr-2 text-[rgba(0,0,0,0.45)]">{comment}</span>
      </div>
      {/* 收藏遊記未登入時 */}
      <CustomModal
        modal={loginConfirm}
        setModal={setLoginConfirm}
        typeConfirm
        typeConfirmWarnIcon
        overflowOpen
        typeConfirmText={'請先登入，自動跳轉中...'}
        onConfirm={() => {
          setLoginConfirm(false)
        }}
      />
    </div>
  )
}
