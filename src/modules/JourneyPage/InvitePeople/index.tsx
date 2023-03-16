import React, { useState } from 'react'
import { MdAdd, MdOutlineCancel } from 'react-icons/md'
import { BsPersonFillAdd, BsLink45Deg } from 'react-icons/bs'
import { RiGlobalLine } from 'react-icons/ri'

export default function InvitePeople() {
  // 夥伴帳號 value
  const [value, setValue] = useState('')

  // 新增夥伴帳號
  const [mail, setMail] = useState([
    {
      username: '工藤新一',
      account: 'aswe5231267@gmail.com',
    },
    {
      username: '安妮亞',
      account: 'aswe5231267@gmail.com',
    },
    {
      username: '苦艾酒',
      account: 'aswe5231267@gmail.com',
    },
    {
      username: '彭德',
      account: 'aswe5231267@gmail.com',
    },
  ])
  const addMail = () => {
    setMail([
      ...mail,
      {
        username: '彭德',
        account: value,
      },
    ])
    setValue('')
  }

  // 刪除夥伴帳號
  const deleteMail = (index: number) => {
    const newMail = [...mail]
    newMail.splice(index, 1)
    setMail(newMail)
  }

  return (
    <div className="w-full lg:w-2/3">
      <h2 className="flex items-center space-x-2 mb-4">
        <BsPersonFillAdd className="text-xl" />
        <span className="font-bold text-xl">揪人去</span>
      </h2>

      <div className="px-6 py-5 bg-[#d7d7d7] mb-6 lg:mb-0">
        <div className="flex space-x-4 mb-5">
          <input
            type="text"
            placeholder="請輸入夥伴帳號"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border px-5 py-4 flex-grow"
          />
          <button
            className="border p-4"
            onClick={() => {
              addMail()
            }}
          >
            <MdAdd className="text-2xl" />
          </button>
        </div>

        <div className="bg-[#ccc] p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <RiGlobalLine />
              <span>共同編輯</span>
            </div>
            <BsLink45Deg />
          </div>
        </div>

        <div className="h-[180px] overflow-y-auto">
          {mail.map(({ username, account }, index) => {
            return (
              <div className="bg-[#fff] border-b-2 p-4" key={index}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-5">
                    <span className="max-w-[64px] w-full inline-block overflow-hidden text-ellipsis">
                      {username}
                    </span>
                    <span className="w-full inline-block overflow-hidden text-ellipsis">
                      {account}
                    </span>
                  </div>
                  <MdOutlineCancel
                    onClick={() => {
                      deleteMail(index)
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
