import React, { useEffect, useRef, useState } from 'react'
import HeaderNotifiList from './HeaderNotifiList'
import { HeaderNotifiNone } from './HeaderNotifiNone'
import { NotificationRenderType } from '@/util/NotificationDataType'
import { HeaderCustomSkeleton } from './HeaderCustomSkeleton'
import translTextAry from '@/constant/notifiData'
import { getPage, setPage, addNotifiData, getData } from '@/redux/notifiSlice'
import { getCookie } from 'cookies-next'
import { debounce } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

export function HeaderNotifiBlock() {
  const data = useSelector(getData)
  const dispatch = useDispatch()

  const newestData = translTextAry(
    data.NotificationData.filter((item) => item.IsNew)
  )

  const oldestData = translTextAry(
    data.NotificationData.filter((item) => !item.IsNew)
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLUListElement>(null)

  const page = useSelector(getPage)
  const [isLoading, setIsLoading] = useState(false)

  const [isMoreDataEnd, setIsMoreDataEnd] = useState(false)

  const fetchData = debounce(async () => {
    setIsLoading(true)

    try {
      const token = getCookie('auth')
      const myHeaders = new Headers()
      if (token !== undefined) {
        myHeaders.append('Authorization', String(token))
      }
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      }

      const res = await fetch(
        `https://travelmaker.rocket-coding.com/api/users/notifications/${page}`,
        requestOptions
      )
      const resJSON = await res.json()
      if (res.status === 400) {
        // console.log('頁數已經全部取得')
        setIsMoreDataEnd(true)
        return
      }
      dispatch(setPage())
      dispatch(addNotifiData(resJSON))
    } finally {
      //
    }

    setIsLoading(false)
  }, 200)
  useEffect(() => {
    const handleScroll = () => {
      const containerTop = containerRef.current?.getBoundingClientRect().top
      const top = ref.current?.getBoundingClientRect().top

      if (top !== undefined && containerTop !== undefined) {
        const referenceTopRelativeToContainer = top - containerTop
        const containerHeight = containerRef.current?.clientHeight

        if (
          containerHeight !== undefined &&
          referenceTopRelativeToContainer <= containerHeight
        ) {
          if (!isLoading) {
            fetchData()
          }
        }
      }
    }

    containerRef.current?.addEventListener('scroll', handleScroll)
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      containerRef.current?.removeEventListener('scroll', handleScroll)
    }
  }, [dispatch, fetchData, isLoading, page])

  return (
    <div
      ref={containerRef}
      className=" pt-3 overflow-scroll  min-[420px]:w-[356px] w-[calc(100dvw-32px)]  h-[520px] border ml-auto absolute right-0 top-[78px] z-10 rounded-lg shadow-lg bg-white focus:text-blue-600"
    >
      <div>
        <h3 className="border-b border-[#DCDCDC]">
          <p className="font-bold px-5 pt-2 pb-2">最新通知</p>
        </h3>
        <ul>
          {/* 記得暫無通知 改oldesData */}
          {newestData.map((item: NotificationRenderType, i) => {
            return <HeaderNotifiList item={item} key={i} />
          })}
          {newestData.length === 0 ? <HeaderNotifiNone /> : null}
        </ul>
      </div>
      {oldestData.length === 0 ? null : (
        <div>
          <h3 className="border-b border-[#DCDCDC]">
            <p className="font-bold px-5 pt-2 pb-2">先前通知</p>
          </h3>
          <ul>
            {oldestData.map((item: NotificationRenderType, i) => {
              return <HeaderNotifiList item={item} key={i} />
            })}
          </ul>
        </div>
      )}
      {data.NotificationData.length >= 13 && !isMoreDataEnd ? (
        <ul ref={ref}>
          <HeaderCustomSkeleton />
        </ul>
      ) : null}
      <ul>{isMoreDataEnd ? <HeaderNotifiNone /> : null}</ul>
      {/* 小於Count 13的因為從頭到尾不會再繼續下拉get資料，所以這個state始終不會變true。 */}
    </div>
  )
}
