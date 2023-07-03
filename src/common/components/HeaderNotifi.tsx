import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IoMdNotifications } from 'react-icons/io'
import {
  changeStatus,
  getData,
  getIsShow,
  setIsShow,
  setIsShowMobile,
} from '@/redux/notifiSlice'

import 'react-loading-skeleton/dist/skeleton.css'

import { getCookie } from 'cookies-next'
import { HeaderNotifiBlock } from './HeaderNotifiBlock'
import { useRouter } from 'next/router'

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
  useEffect(() => {
    dispatch(setIsShow(false))
    dispatch(setIsShowMobile(false))
  }, [dispatch, router.asPath]) //asPatch當href為原址時不會觸發

  return (
    <li className="relative" ref={panelRef}>
      {/* {String(isShow)} //測試用 */}
      <button
        type="button"
        onClick={async () => {
          dispatch(setIsShow(!isShow)) //redux setState
          if (isShow) {
            return
          }
          try {
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
              `https://travelmaker.rocket-coding.com/api/users/notifications/reset`,
              requestOptions
            )
            if (res.status === 200) {
              dispatch(changeStatus())
            }
          } finally {
            //
          }
        }}
        className="flex space-x-2 items-center py-10 group hover:animate-navbar-hover relative "
      >
        <div className="flex space-x-2 items-center  duration-300 relative py-1 pr-2  rounded-md ">
          <div className="absolute translate-y-8 group-hover:translate-y-5 group-hover:opacity-100  w-0 opacity-0 bg-highlight h-[2px] group-hover:w-[calc(100%-12px)] left-2  duration-500"></div>
          <div className="relative">
            {/* icon */}
            <IoMdNotifications className="text-2xl text-primary group-hover:text-highlight duration-150" />
            {/* {data.Status ? ( //發api後控制toggle state，或根據data內的isNew
              <div className="absolute bg-highlight top-full left-full translate-x-[100%] translate-y-[-200%] rounded-full w-[32px] h-[18px] text-white text-sm flex items-center justify-center">
                99+
              </div>
            ) : null} */}
            {/* 紅色圓點 */}
            {data.Status ? ( //發api後控制toggle state，或根據data內的isNew
              <div className="absolute bg-highlight  top-0 right-0 translate-y-[-40%] translate-x-[40%] rounded-full px-1  h-[14px] flex justify-center items-center text-white text-xs">
                {data.Counts > 99 ? '99+' : data.Counts}
              </div>
            ) : null}
          </div>
          <span className="text-xl group-hover:text-highlight/80">通知</span>
        </div>
      </button>
      {isShow ? ( //reduex state
        <HeaderNotifiBlock />
      ) : null}
    </li>
  )
}
