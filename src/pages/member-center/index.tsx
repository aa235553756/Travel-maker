import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import { BsLightbulb, BsExclamationCircle } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { MemberCountProps } from '@/pages/member-center/types'
import { CustomModal } from '@/common/components/CustomModal'
import { useForm } from 'react-hook-form'

interface RegisterFormProp {
  NewPassword: string
  Password: string
  PasswordRepeat: string
}

export async function getServerSideProps({
  req,
  res,
}: {
  req: undefined
  res: undefined
}) {
  const token = getCookie('auth', { req, res })

  // 【API】會員中心左邊選單各項數量
  const resMemberCountData = await fetch(
    `https://travelmaker.rocket-coding.com/api/users/dataCounts`,
    {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const memberCountData = await resMemberCountData.json()
  return {
    props: {
      memberCountData,
    },
  }
}

export default function MemberCenter({
  memberCountData,
}: {
  memberCountData: MemberCountProps
}) {
  const router = useRouter()
  console.log(router)
  const token = getCookie('auth')
  const user = getCookie('user') ? JSON.parse(String(getCookie('user'))) : null

  // 這邊避免使用三元運算會報出伺服器與本地 HTML 渲染不一致的問題
  // 可參考 https://nextjs.org/docs/messages/react-hydration-error
  const [account, setAccount] = useState('')
  const [picture, setPicture] = useState('')
  const [editNickname, setEditNickname] = useState(false)
  const [nicknameValue, setNicknameValue] = useState('')
  const [modal, setModal] = useState(false)
  const [countData, setCountData] = useState(memberCountData)

  // 取得暱稱/電子信箱/頭貼
  useEffect(() => {
    setAccount(user.Account)
    setPicture(user.ProfilePicture)
    setNicknameValue(user.UserName)
  }, [user])

  // 將行程及房間數量往 MemberLayout 傳
  useEffect(() => {
    setCountData(countData)
  }, [countData])

  // 修改密碼
  const {
    register,
    handleSubmit,
    watch: watch,
    formState: { errors },
  } = useForm<RegisterFormProp>()

  async function onSubmit(data: RegisterFormProp) {
     // RHF data
     alert(JSON.stringify(data))
     const newData = {
       Password: data.Password,
       NewPassword: data.NewPassword,
       PasswordRepeat: data.PasswordRepeat,
     }
     alert(JSON.stringify(newData))

     // 【API】修改密碼(會員中心)
     const res = await fetch(
       `https://travelmaker.rocket-coding.com/api/users/changePassword`,
       {
         method: 'PUT',
         headers: {
           Authorization: `${token}`,
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           NewPassword: newData.NewPassword,
           OriginalPassword: newData.Password,
         }),
       }
     )
     const resJSON = await res.json()

     console.log(data)
     console.log(res)
     console.log(resJSON)
  }

  return (
    <div>
      {/* 手機版 */}
      <div className="container mt-8 mb-[100px] md:mt-[96px]">
        <h2 className="text-lg font-bold mb-7 md:hidden">帳號設定</h2>
        <div className="member-shadow rounded-md px-5 py-7 flex flex-col space-y-6 w-full md:hidden">
          <div className="flex items-center">
            <div className="w-[80px]">頭像</div>
            <Image
              width="56"
              height="56"
              src={picture}
              alt="圖片"
              className="h-[56px] rounded-full"
            ></Image>
          </div>
          {/* 編輯暱稱 */}
          {editNickname ? (
            <div className="flex items-center">
              <div className="w-[80px]">暱稱</div>
              <input
                type="text"
                value={nicknameValue}
                onChange={(e) => {
                  setNicknameValue(e.target.value)
                }}
                className="input-style !p-3 w-[128px] md:w-[162px] lg:w-[250px] mr-3"
              />
              <button
                className="border-[1px] border-primary text-primary px-4 py-3 rounded-md block"
                onClick={() => {
                  setEditNickname(!editNickname)
                  setNicknameValue(nicknameValue)
                }}
              >
                儲存
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="w-[80px]">暱稱</div>
              <span className="w-[140px]">{nicknameValue}</span>
              <button
                className="border-[1px] border-primary text-primary px-4 py-3 rounded-md block"
                onClick={() => {
                  setEditNickname(!editNickname)
                }}
              >
                編輯
              </button>
            </div>
          )}
          <div className="flex items-center">
            <div className="w-[80px]">電子信箱</div>
            <span>{account}</span>
          </div>
          <div className="flex items-center text-highlight !mt-1">
            <div className="w-[80px]"></div>
            <BsExclamationCircle />
            <span className="ml-2">無法變更</span>
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-md block mr-auto">
            修改密碼
          </button>
        </div>
      </div>

      {/* 修改密碼彈窗 */}
      <CustomModal modal={modal} setModal={setModal} wrapper>
        <div className="w-[552px] pt-8 p-7 bg-white rounded-xl ">
          {/* 標題 */}
          <h4 className="text-xl mb-5">修改密碼</h4>
          <hr />
          {/* 修改密碼內容 */}
          <form
            className="flex flex-col space-y-8 pt-9 pb-7"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="flex items-center">
              <span className="text-lg block w-1/3">目前密碼</span>
              <div className="flex flex-col">
                <input
                  type="password"
                  placeholder="請輸入目前密碼"
                  className="px-4 py-2 border border-gray-D9 placeholder-gray-A8 rounded-md  focus:outline-none focus:border-secondary"
                  {...register('Password', {
                    required: { value: true, message: '此欄位必填寫' },
                    minLength: { value: 8, message: '密碼至少為 8 碼' },
                  })}
                />
                <span className="text-highlight !mt-2">
                  {errors.Password?.message}
                </span>
              </div>
            </label>
            <label className="flex items-center">
              <span className="text-lg block w-1/3">新密碼</span>
              <div className="flex flex-col">
                <input
                  type="password"
                  placeholder="請輸入新密碼"
                  className="px-4 py-2 border border-gray-D9 placeholder-gray-A8 rounded-md  focus:outline-none focus:border-secondary"
                  {...register('NewPassword', {
                    required: { value: true, message: '此欄位必填寫' },
                    minLength: { value: 8, message: '密碼至少為 8 碼' },
                  })}
                />
                <span className="text-highlight !mt-2">
                  {errors.NewPassword?.message}
                </span>
              </div>
            </label>
            <label className="flex items-center">
              <span className="text-lg block w-1/3">再次輸入密碼</span>
              <div className="flex flex-col">
                <input
                  type="password"
                  placeholder="請再次輸入新密碼"
                  className="px-4 py-2 border border-gray-D9 placeholder-gray-A8 rounded-md  focus:outline-none focus:border-secondary"
                  {...register('PasswordRepeat', {
                    required: { value: true, message: '此欄位必填寫' },
                    validate: (val) => {
                      if (watch('NewPassword') !== val) {
                        return '密碼不一致'
                      }
                    },
                  })}
                />
                <span className="text-highlight !mt-2">
                  {errors.PasswordRepeat?.message}
                </span>
              </div>
            </label>
            {/* 按鈕 */}
            <div className="flex justify-end space-x-9">
              <button
                className="border border-primary text-primary text-xl px-9 py-3 font-bold rounded-md hover:border-primary-tint hover:text-primary-tint hover:duration-500"
                onClick={() => {
                  setModal(!modal)
                }}
              >
                取消
              </button>
              <button
                className="bg-primary border border-transparent text-white text-xl px-9 py-3 font-bold rounded-md hover:bg-primary-tint hover:duration-500"
                type="submit"
              >
                儲存
              </button>
            </div>
          </form>
        </div>
      </CustomModal>

      <MemberLayout path="/" countData={countData} setCountData={setCountData}>
        <div className="md:flex md:flex-col md:space-y-7 md:w-2/3">
          {/* 分類資訊區 */}
          <div className="md:member-shadow md:rounded-md">
            <h2 className="md:text-2xl md:px-10 md:py-8">帳號設定</h2>
            <hr className="md:w-full md:border-gray-E2" />
            <div className="md:flex md:items-center md:space-x-2 md:px-10 md:py-6 md:text-gray-73">
              <BsLightbulb />
              <p>為了確保用戶身份的真實性，您無法變更電子信箱。</p>
            </div>
          </div>
          {/* 詳細資訊區 */}
          <div className="md:member-shadow md:rounded-md md:flex md:flex-col md:space-y-12 md:px-10 md:py-16">
            <div className="md:flex md:items-center">
              <div className="md:w-[100px] lg:w-[200px]">頭像</div>
              <Image
                width="100"
                height="100"
                src={picture}
                alt="圖片"
                className="h-[100px] rounded-full"
              ></Image>
            </div>
            {/* 編輯暱稱 */}
            {editNickname ? (
              <div className="md:flex md:items-center">
                <div className="md:w-[100px] lg:w-[200px]">暱稱</div>
                <div className="md:flex md:items-center md:space-x-3">
                  <input
                    type="text"
                    value={nicknameValue}
                    onChange={(e) => {
                      setNicknameValue(e.target.value)
                    }}
                    className="input-style !p-3 w-[128] md:w-[162px] lg:w-[250px] mr-3"
                  />
                  <button
                    className="border-[1px] border-primary text-primary px-4 py-3 rounded-md block"
                    onClick={() => {
                      setEditNickname(!editNickname)
                      setNicknameValue(nicknameValue)
                    }}
                  >
                    儲存
                  </button>
                </div>
              </div>
            ) : (
              <div className="md:flex md:items-center">
                <div className="md:w-[100px] lg:w-[200px]">暱稱</div>
                <div className="md:flex md:items-center">
                  <span className="md:w-[162px] lg:w-[250px]">
                    {nicknameValue}
                  </span>
                  <button
                    className="border border-primary text-primary px-4 py-3 rounded-md block"
                    onClick={() => {
                      setEditNickname(!editNickname)
                    }}
                  >
                    編輯
                  </button>
                </div>
              </div>
            )}
            <div className="md:flex md:items-center">
              <div className="md:w-[100px] lg:w-[200px]">電子信箱</div>
              <span className="md:w-[172px] lg:w-[250px]">{account}</span>
              <div className="hidden lg:flex lg:items-center lg:space-x-2 lg:text-highlight">
                <BsExclamationCircle />
                <span>無法變更</span>
              </div>
            </div>
            <div className="flex items-center text-highlight !mt-1 lg:hidden">
              <div className="w-[100px]"></div>
              <BsExclamationCircle />
              <span className="ml-2">無法變更</span>
            </div>
            <button
              className="bg-primary text-white px-6 py-3 rounded-md block mr-auto hover:bg-primary-tint hover:duration-500"
              onClick={() => {
                setModal(!modal)
              }}
            >
              修改密碼
            </button>
          </div>
        </div>
      </MemberLayout>
    </div>
  )
}
