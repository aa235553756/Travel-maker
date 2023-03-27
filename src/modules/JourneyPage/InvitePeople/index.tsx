import React, { useState } from 'react'
import { MdAdd, MdOutlineCancel } from 'react-icons/md'
import { BsPersonFillAdd, BsLink45Deg } from 'react-icons/bs'
import { RiGlobalLine } from 'react-icons/ri'
import Image from 'next/image'

export default function InvitePeople() {
  // 產生色碼
  const generateHexCode = () => {
    // 可選的 HEX 色碼字元
    const hexChars = '0123456789ABCDEF'

    // 生成一個 6 個字符的 HEX 色碼
    let hexCode = ''
    for (let i = 0; i < 6; i++) {
      hexCode += hexChars[Math.floor(Math.random() * 16)]
    }

    // 返回 HEX 色碼
    return '#' + hexCode
  }

  // 夥伴帳號 value
  const [value, setValue] = useState('')

  // 新增夥伴帳號
  const [mail, setMail] = useState([
    {
      username: '工藤新一',
      src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    },
    {
      username: '安妮亞',
      src: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    },
  ])
  const addMail = () => {
    setMail([
      ...mail,
      {
        username: '彭德',
        src: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
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
          <ul className="bg-[#fff] flex flex-wrap p-3">
            <li className="text-center relative w-[64px] mr-2 mb-2">
              <Image
                width="48"
                height="48"
                src="https://images.unsplash.com/photo-1678649929657-850077f854e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="圖片"
                style={{ border: `2px solid ${generateHexCode()}` }}
                className={`block mx-auto w-12 h-12 rounded-full bg-[#ccc] border-2 mb-2`}
              ></Image>
              <p>房主</p>
            </li>

            {mail.map(({ username, src }, index) => {
              return (
                <li
                  className="text-center relative w-[64px] mr-2 mb-2"
                  key={index}
                >
                  <Image
                    width="48"
                    height="48"
                    src={src}
                    alt="圖片"
                    style={{ border: `2px solid ${generateHexCode()}` }}
                    className={`block mx-auto w-12 h-12 rounded-full bg-[#ccc] border-2 mb-2`}
                  ></Image>
                  <p className="w-full inline-block overflow-hidden text-ellipsis">
                    {username}
                  </p>
                  <MdOutlineCancel
                    className="absolute top-0 -right-2"
                    onClick={() => {
                      deleteMail(index)
                    }}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
