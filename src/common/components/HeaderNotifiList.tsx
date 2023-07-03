import React from 'react'
import userDefault from 'public/userDefault.png'
import Image from 'next/image'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import {
  clearIsNew,
  getPage,
  setIsLoading,
  setNotifiData,
} from '@/redux/notifiSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  NotificationRenderType,
  NotificationType,
} from '@/util/NotificationDataType'

export default function HeaderNotifiList({
  item,
}: {
  item: NotificationRenderType
}) {
  const { text, initDate, isRead, profilePicture, notificationId, link } = item

  const dispatch = useDispatch()
  const page = useSelector(getPage)

  return (
    <li className="min-h-[66px] border-b border-[#F5F5F5] hover:bg-[#DCDCDC]">
      <Link
        href={link}
        className="min-h-[66px] flex justify-between items-center px-5 py-2"
        onClick={handelIsRead()}
      >
        {/* 用戶圖片及通知文字 */}
        <div className="flex items-center">
          <Image
            width={40}
            height={40}
            src={profilePicture || userDefault}
            alt={'userProfilePicture'}
            className="w-[40px] h-[40px] mr-2 rounded-full"
          />
          <div className="flex flex-col justify-center">
            {text}
            <span className="text-sm text-primary">{initDate}</span>
          </div>
        </div>
        {/* 未讀小紅點 */}
        <div className="pl-2 min-w-[16px]">
          {!isRead ? (
            <div className="w-2 h-2 rounded-full bg-highlight"></div>
          ) : null}
        </div>
      </Link>
    </li>
  )

  function handelIsRead():
    | React.MouseEventHandler<HTMLAnchorElement>
    | undefined {
    return async () => {
      try {
        dispatch(setIsLoading(true))

        const token = getCookie('auth')
        const myHeaders = new Headers()
        if (token !== undefined) {
          myHeaders.append('Authorization', String(token))
        }
        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
        }
        const res = await fetch(
          `https://travelmaker.rocket-coding.com/api/users/notifications/${notificationId}`,
          requestOptions
        )
        if (res.status === 400) {
          return
        }
        if (item.isNew) {
          // 是否為最新通知 -> 拔除該通知 (接下來重新get資料後會自動跑到先前通知)
          dispatch(clearIsNew(notificationId))
        }

        const promiseAry = []

        for (let i = 1; i < page; i++) {
          promiseAry.push(() =>
            fetch(
              `https://travelmaker.rocket-coding.com/api/users/notifications/${i}`,
              { method: 'GET', headers: myHeaders }
            )
          )
        }
        const resAry = await Promise.all(promiseAry.map((fn) => fn()))

        const newObj = {
          Status: false,
          Counts: 0,
          NotificationData: [] as NotificationType[],
        }
        for (let i = 0; i < resAry.length; i++) {
          if (resAry[i].ok) {
            const response = resAry[i]
            const jsonData = await response.json()
            jsonData.NotificationData.map((item: NotificationType) =>
              newObj.NotificationData.push(item)
            )
            newObj.Status = jsonData.Status
            newObj.Counts = jsonData.Counts
          } else {
            throw new Error('網路連線錯誤')
          }
        }

        dispatch(setNotifiData(newObj))
      } catch (err) {
        alert(err)
      } finally {
        //
      }
    }
  }
}
