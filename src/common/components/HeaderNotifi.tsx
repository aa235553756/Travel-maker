import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IoMdNotifications } from 'react-icons/io'
import { getData, getIsShow, setIsShow } from '@/redux/notifiSlice'
import translTextAry from '@/constant/notifiData'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import HeaderNotifiList from './HeaderNotifiList'
import { debounce } from 'lodash'

export default function HeaderNotifi() {
  const router = useRouter()

  const isShow = useSelector(getIsShow)
  const data = useSelector(getData)

  const dispatch = useDispatch()

  const panelRef = useRef<HTMLLIElement>(null)

  // panel點擊其他地方關閉邏輯
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as HTMLLIElement)
      ) {
        dispatch(setIsShow(false))
      }
    }
  }, [dispatch])

  // 換頁時要被關閉
  // useEffect(() => {
  //   dispatch(setIsShow(false))
  // }, [dispatch, router])

  const newestData = translTextAry(
    data.NotificationData.filter((item) => item.IsNew)
  )

  const oldestData = translTextAry(
    data.NotificationData.filter((item) => !item.IsNew)
  )

  return (
    <li className="relative" ref={panelRef}>
      {/* {String(isShow)} //測試用 */}
      <button
        type="button"
        onClick={() => {
          dispatch(setIsShow(!isShow)) //redux setState
        }}
        className="flex space-x-2 items-center py-10 group hover:animate-navbar-hover relative "
      >
        <div className="flex space-x-2 items-center  duration-300 relative py-1 pr-2  rounded-md ">
          <div className="absolute translate-y-8 group-hover:translate-y-5 group-hover:opacity-100  w-0 opacity-0 bg-highlight h-[2px] group-hover:w-[calc(100%-12px)] left-2  duration-500"></div>
          <div className="relative">
            {/* icon */}
            <IoMdNotifications className="text-2xl text-primary group-hover:text-highlight duration-150" />
            {/* 紅色圓點 */}
            {true ? ( //發api後控制toggle state，或根據data內的isNew
              <div className="absolute bg-highlight top-0 right-0 rounded-full w-[10px] h-[10px]"></div>
            ) : null}
          </div>
          <span className="text-xl group-hover:text-highlight/80">通知</span>
        </div>
      </button>
      {isShow ? ( //reduex state
        <div className="pt-3 overflow-scroll w-[356px] h-[520px] border ml-auto absolute right-0 top-[78px] z-10 rounded-lg shadow-lg bg-white focus:text-blue-600">
          {newestData.length !== 0 ? ( //有新的才顯示
            <div>
              <h3 className="border-b border-[#DCDCDC]">
                <p className="font-bold px-5 pt-2 pb-2">最新通知</p>
              </h3>
              <ul>
                {newestData.map((item, i) => {
                  return <HeaderNotifiList item={item} key={i} />
                })}
              </ul>
            </div>
          ) : null}
          <div>
            <h3 className="border-b border-[#DCDCDC]">
              <p className="font-bold px-5 pt-2 pb-2">先前通知</p>
            </h3>
            <ul>
              {oldestData.length === 0 ? <NotifiNone /> : null}
              {oldestData.map((item, i) => {
                return <HeaderNotifiList item={item} key={i} />
              })}
              <li>
                <CustomSkeleton />
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </li>
  )
}

function CustomSkeleton() {
  return (
    <>
      <li className=" min-h-[66px] border-b border-[#F5F5F5] px-5 py-2 flex justify-between items-center">
        {/* 用戶圖片及通知文字 */}
        <div className="flex items-center w-full">
          <Skeleton circle className="!w-[40px] h-[40px] mr-2" />
          {/* <div className="flex flex-col justify-center"> */}
          <div className="w-full">
            <Skeleton />
            <Skeleton className="!w-14" />
          </div>
          {/* 佔位 */}
          <div className="pl-2 min-w-[16px]"></div>
        </div>
      </li>
      <li className=" min-h-[66px] border-b border-[#F5F5F5] px-5 py-2 flex justify-between items-center">
        {/* 用戶圖片及通知文字 */}
        <div className="flex items-center w-full">
          <Skeleton circle className="!w-[40px] h-[40px] mr-2" />
          {/* <div className="flex flex-col justify-center"> */}
          <div className="w-full">
            <Skeleton />
            <Skeleton className="!w-14" />
          </div>
          {/* 佔位 */}
          <div className="pl-2 min-w-[16px]"></div>
        </div>
      </li>
    </>
  )
}

function NotifiNone() {
  return (
    <li className="flex flex-col justify-center min-h-[66px] px-5 py-2 border-b border border-[#F5F5F5]">
      <p className="text-primary">暫無通知</p>
    </li>
  )
}
