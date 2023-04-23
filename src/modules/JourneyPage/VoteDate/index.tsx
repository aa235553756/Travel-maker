import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { BsCalendar3 } from 'react-icons/bs'
import { MdAdd, MdOutlineCancel, MdOutlineDateRange } from 'react-icons/md'
import moment from 'moment'
import { getCookie } from 'cookies-next'
interface VoteDatesProp {
  VoteDateId: number
  Date: string
  Count: number
  IsVoted: boolean
  UserGuid?: string
}
interface VoteDataProp {
  RoomGuid?: string
  Date?: string
  VoteDates: VoteDatesProp[]
  CreaterGuid?: string
}

export default function VoteDate({ data: originData }: { data: VoteDataProp }) {
  const [startDate, setStartDate] = useState<null | Date>(null)
  const [selectedDates, setSelectedDates] = useState(originData.VoteDates)
  const token = getCookie('auth')

  // 新增聚會日期
  const handleAddDate = async () => {
    try {
      if (startDate === null) {
        alert('請選擇日期')
        return
      }

      if (startDate) {
        // 【API】主揪.被揪新增日期選項
        const resAddDateData = await fetch(
          `https://travelmaker.rocket-coding.com/api/rooms/dates
        `,
          {
            method: 'POST',
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              RoomGuid: originData.RoomGuid,
              Date: moment(startDate).format('YYYY-MM-DD'),
            }),
          }
        )
        const addDateData = await resAddDateData.json()

        // 打完 API 後渲染畫面
        // 注意這裡有斷言，不確定會不會出錯
        const renderAddDate = [
          ...selectedDates,
          {
            Date: startDate,
            Count: 0,
            VoteDateId: addDateData.VoteDateId,
            UserGuid: userGuid,
          },
        ] as VoteDatesProp[]
        setSelectedDates(renderAddDate)
        setStartDate(null)
      }
    } catch (err) {
      alert(err)
    }
  }

  // 取得房主頭貼
  // 判斷有無取得 cookie
  const user = getCookie('user') ? JSON.parse(String(getCookie('user'))) : null
  const [userGuid, setUserGuid] = useState('')
  useEffect(() => {
    setUserGuid(user?.UserGuid)
  }, [user])

  const handleVoteDate = async (
    VoteDateId: number,
    Count: number,
    IsVoted: boolean
  ) => {
    try {
      if (!IsVoted) {
        // 【API】主揪.被揪投票
        const resVoteDateData = await fetch(
          `https://travelmaker.rocket-coding.com/api/rooms/votes/${VoteDateId}
      `,
          {
            method: 'POST',
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        if (resVoteDateData.ok) {
          // 打完 API 後渲染畫面
          const renderVoted = selectedDates.map((date) =>
            date.VoteDateId === VoteDateId
              ? { ...date, Count: Count + 1, IsVoted: !IsVoted }
              : date
          )
          setSelectedDates(renderVoted)
        }
      } else if (IsVoted) {
        // 【API】主揪.被揪取消投票
        const resDelVoteDateData = await fetch(
          `https://travelmaker.rocket-coding.com/api/rooms/votes/${VoteDateId}
      `,
          {
            method: 'DELETE',
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        if (resDelVoteDateData.ok) {
          const renderCancelDate = selectedDates.map((date) =>
            date.VoteDateId === VoteDateId
              ? { ...date, Count: Count - 1, IsVoted: !IsVoted }
              : date
          )
          setSelectedDates(renderCancelDate)
          return
        }
      }
    } catch (err) {
      alert(err)
    }
  }

  // 刪除聚會日期
  const handleDelDate = (index: number) => {
    setSelectedDates((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full lg:w-1/3">
      <h2 className="flex items-center space-x-2 mb-4">
        <MdOutlineDateRange className="text-xl" />
        <span className="text-xl">喬日期</span>
      </h2>

      <div className="px-6 py-5 shadow-[1px_1px_15px_1px_rgba(1,1,15,0.15)] rounded-md mb-6 lg:mb-0">
        <div className="flex space-x-4 mb-5 ">
          <div className="relative w-full">
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="relative border border-gray-D9 placeholder-gray-D9 bg-[#FBFBFB] rounded-md px-5 py-4 w-full focus:outline-none focus:bg-white focus:border-primary"
              placeholderText="請選擇日期"
              minDate={new Date()}
              showDisabledMonthNavigation
            />
            <div className="absolute top-1/2 right-5 transform -translate-y-1/2">
              <BsCalendar3 className="text-xl" />
            </div>
          </div>
          <button
            className="border border-gray-D9 text-black rounded-md p-4 hover:bg-primary hover:text-white hover:duration-500"
            onClick={() => {
              handleAddDate()
            }}
          >
            <MdAdd className="text-2xl" />
          </button>
        </div>

        <div className="h-[236px] overflow-y-auto flex flex-col space-y-4">
          {selectedDates.map((item, index) => {
            return (
              <div
                className="border border-[#EAEAEA] p-4 rounded-md  hover:border-primary-dark hover:bg-primary-dark/10 hover:duration-500"
                key={item.VoteDateId}
              >
                <div className="flex justify-between">
                  <div className="flex space-x-4">
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      id="dateCheckbox"
                      value=""
                      defaultChecked={item.IsVoted}
                      onClick={() => {
                        handleVoteDate(
                          item.VoteDateId,
                          item.Count,
                          item.IsVoted
                        )
                      }}
                    />
                    <label htmlFor="dateCheckbox">
                      {moment(item.Date).format('YYYY-MM-DD')}
                    </label>
                  </div>
                  <div className="flex items-center space-x-4 cursor-pointer">
                    <span>{item.Count}</span>
                    {/* 若是主揪，執行前者，若非主揪，執行後者 */}
                    {originData && originData.CreaterGuid === userGuid ? (
                      // 若是主揪，則所有人顯示 Icon
                      item.UserGuid === userGuid ? (
                        <MdOutlineCancel
                          onClick={() => {
                            handleDelDate(index)
                          }}
                        />
                      ) : (
                        <div className="w-4 h-4"></div>
                      )
                    ) : item.UserGuid === userGuid ? (
                      //  若是被揪，顯示登入者自己的 Icon
                      <MdOutlineCancel
                        onClick={() => {
                          handleDelDate(index)
                        }}
                      />
                    ) : (
                      <div className="w-4 h-4"></div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
