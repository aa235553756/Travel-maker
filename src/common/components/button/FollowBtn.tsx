import { getCookie } from 'cookies-next'
import React, { useState } from 'react'

export default function FollowBtn({
  isFollow,
  id,
}: {
  isFollow: boolean
  id: string
}) {
  const [follow, setFollow] = useState(isFollow)
  const token = getCookie('auth')
  const user = getCookie('user') ? JSON.parse(String(getCookie('user'))) : null

  const handleFollow = async () => {
    // 【API】新增追蹤
    await fetch(
      `https://travelmaker.rocket-coding.com/api/blogs/follow/${id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
  }

  const handleCancelFollow = async () => {
    // 【API】取消追蹤
    await fetch(
      `https://travelmaker.rocket-coding.com/api/blogs/follow/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
  }

  const handleGetFollow = async () => {
    // 【API】顯示粉絲
    await fetch(
      `https://travelmaker.rocket-coding.com/api/blogs/${user.UserGuid}/fans/1`,
      {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
  }

  return (
    <div>
      {follow ? (
        <button
          type="button"
          className="border border-primary text-primary p-2 w-[80px] rounded-md md:w-[114px] md:px-6 md:py-2"
          onClick={() => {
            handleCancelFollow()
            handleGetFollow()
            setFollow(!follow)
          }}
        >
          追蹤中
        </button>
      ) : (
        <button
          type="button"
          className="border border-transparent bg-primary text-white p-2 w-[80px] rounded-md md:w-[114px] md:px-6 md:py-2"
          onClick={() => {
            handleFollow()
            handleGetFollow()
            setFollow(!follow)
          }}
        >
          追蹤
        </button>
      )}
    </div>
  )
}
