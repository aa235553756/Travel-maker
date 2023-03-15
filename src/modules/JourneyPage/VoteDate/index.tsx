import React, { useState } from 'react'
import { MdOutlineDateRange, MdAdd, MdOutlineCancel } from 'react-icons/md'

export default function VoteDate() {
  // 聚會日期 value
  const [value, setValue] = useState('')

  // 新增聚會日期
  const [date, setDate] = useState([
    {
      date: '2023.03.17',
      number: 1,
    },
    {
      date: '2023.03.18',
      number: 0,
    },
    {
      date: '2023.03.20',
      number: 0,
    },
    {
      date: '2023.03.21',
      number: 0,
    },
    {
      date: '2023.03.22',
      number: 0,
    },
  ])
  const addDate = () => {
    setDate([
      ...date,
      {
        date: value,
        number: 0,
      },
    ])
    setValue('')
  }

  // 刪除聚會日期
  const deleteDate = (index: number) => {
    const newDate = [...date]
    newDate.splice(index, 1)
    setDate(newDate)
  }

  return (
    <div className="w-full lg:w-1/3">
      <h2 className="flex items-center space-x-2 mb-4">
        <MdOutlineDateRange className="text-xl" />
        <span className="font-bold text-xl">喬日期</span>
      </h2>

      <div className="px-6 py-5 bg-[#d7d7d7] mb-6 lg:mb-0">
        <div className="flex space-x-4 mb-5">
          <input
            type="text"
            placeholder="請選擇聚會日期"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border px-5 py-4 flex-grow"
          />
          <button
            className="border p-4"
            onClick={() => {
              addDate()
            }}
          >
            <MdAdd className="text-2xl" />
          </button>
        </div>

        <div className="h-[236px] overflow-y-auto">
          {date.map(({ date, number }, index) => {
            return (
              <div className="bg-[#ccc] p-4" key={index}>
                <div className="flex justify-between">
                  <div className="flex space-x-4">
                    <input type="checkbox" id="dateOne" value="" />
                    <label htmlFor="dateOne">{date}</label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>{number}</span>
                    <MdOutlineCancel
                      onClick={() => {
                        deleteDate(index)
                      }}
                    />
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
