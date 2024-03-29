import React, { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { BsCalendar3 } from 'react-icons/bs'
import { MdAdd, MdOutlineCancel, MdOutlineDateRange } from 'react-icons/md'
import moment from 'moment'
import { getCookie } from 'cookies-next'
import { CustomModal } from '@/common/components/CustomModal'

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

export default function VoteDate({
  data: originData,
  setLoginConfirm,
}: {
  data: VoteDataProp
  setLoginConfirm: React.Dispatch<boolean>
}) {
  const [startDate, setStartDate] = useState<null | Date>(null)
  const [selectedDates, setSelectedDates] = useState(originData.VoteDates)
  const datePickerRef = useRef<DatePicker>(null)
  const token = getCookie('auth')

  // 點擊日期 ICON 可以選擇日期
  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true)
    }
  }

  // 新增聚會日期
  const handleAddDate = async () => {
    const token = getCookie('auth')
    if (token === undefined) {
      setLoginConfirm(true)
      // setTimeout(() => {
      //   router.push('/login')
      // }, 2000)
      return
    }
    try {
      if (startDate === null) {
        setDateConfirm(true)
        return
      }

      // 篩選出已經有的投票日期
      const filterDate = selectedDates.map((item) => {
        return item.Date
      })

      if (filterDate.includes(moment(startDate).format('YYYY-M-D'))) {
        setDateRepeatConfirm(true)
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
              Date: moment(startDate).format('YYYY-M-D'),
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
  const handleDelDate = async (index: number, voteDateId: number) => {
    try {
      // 【API】主揪.被揪刪除日期選項
      const resDelDateData = await fetch(
        `https://travelmaker.rocket-coding.com/api/rooms/dates/${voteDateId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (resDelDateData.ok) {
        setSelectedDates((prev) => prev.filter((_, i) => i !== index))
      }

      if (resDelDateData.ok) {
        return
      }
    } catch (err) {
      alert(err)
    }
  }

  // 日期確認彈窗
  const [dateConfirm, setDateConfirm] = useState(false)

  // 日期重複輸入彈窗
  const [dateRepeatConfirm, setDateRepeatConfirm] = useState(false)

  return (
    <>
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
                ref={datePickerRef}
              />
              <div
                className="absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  handleIconClick()
                }}
              >
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
                <label
                  className="border border-[#EAEAEA] p-4 rounded-md  hover:border-primary-dark hover:bg-primary-dark/10 hover:duration-500 cursor-pointer"
                  key={item.VoteDateId}
                >
                  <div className="flex justify-between">
                    <div className="flex space-x-4">
                      <input
                        className="cursor-pointer"
                        type="checkbox"
                        // id="dateCheckbox"
                        value=""
                        defaultChecked={item.IsVoted}
                        onChange={() => {
                          handleVoteDate(
                            item.VoteDateId,
                            item.Count,
                            item.IsVoted
                          )
                        }}
                      />
                      <div>{moment(item.Date).format('YYYY-MM-DD')}</div>
                    </div>

                    <div className="flex items-center space-x-4 cursor-pointer">
                      <span>{item.Count}</span>
                      {/* 若是主揪，執行前者，若非主揪，執行後者 */}
                      {originData && originData.CreaterGuid === userGuid ? (
                        // 若是主揪，則所有人顯示 Icon
                        item.UserGuid === userGuid ? (
                          <MdOutlineCancel
                            onClick={() => {
                              handleDelDate(index, item.VoteDateId)
                            }}
                          />
                        ) : (
                          <MdOutlineCancel
                            onClick={() => {
                              handleDelDate(index, item.VoteDateId)
                            }}
                          />
                        )
                      ) : item.UserGuid === userGuid ? (
                        //  若是被揪，顯示登入者自己的 Icon
                        <MdOutlineCancel
                          onClick={() => {
                            handleDelDate(index, item.VoteDateId)
                          }}
                        />
                      ) : (
                        <div className="w-4 h-4"></div>
                      )}
                    </div>
                  </div>
                </label>
              )
            })}
          </div>
        </div>
      </div>

      {/* 日期確認彈窗 */}
      <CustomModal
        modal={dateConfirm}
        setModal={setDateConfirm}
        typeConfirm
        overflowOpen
        typeConfirmWarnIcon
        typeConfirmText={'請選擇日期'}
        onConfirm={() => {
          setDateConfirm(false)
        }}
      />

      {/* 日期重複輸入彈窗 */}
      <CustomModal
        modal={dateRepeatConfirm}
        setModal={setDateRepeatConfirm}
        typeConfirm
        overflowOpen
        typeConfirmWarnIcon
        typeConfirmText={'已有此日期選項'}
        onConfirm={() => {
          setDateRepeatConfirm(false)
        }}
      />
    </>
  )
}
