import React, { useEffect, useRef, useState } from 'react'
import { getCookie } from 'cookies-next'
import { MdAdd, MdOutlineCancel } from 'react-icons/md'
import { BsPersonFillAdd } from 'react-icons/bs'
import { RiGlobalLine } from 'react-icons/ri'
import Image from 'next/image'
import { RoomAttractionsProp } from '@/util/types'
import { FaCrown } from 'react-icons/fa'
import { CustomModal } from '@/common/components/CustomModal'

interface UsersProp {
  ProfilePicture: string
  UserGuid: string
  UserName: string
}

interface InvitePeopleProp {
  AttrationsData: RoomAttractionsProp[]
  RoomName: string
  RoomGuid?: string
  Users?: UsersProp[]
  CreaterGuid?: string
}

export default function InvitePeople({
  data: originData,
  setLoginConfirm,
}: {
  data: InvitePeopleProp
  setLoginConfirm: React.Dispatch<boolean>
}) {
  // 圖片邊框色碼
  const colorAry = [
    '#f8d34f',
    '#45aaf2',
    '#a55eea',
    '#fd9644',
    '#fc5c65',
    '#26de81',
    '#778ca3',
    '#4b7bec',
    '#fed330',
    '#d1d8e0',
    '#2bcbba',
    '#2d98da',
    '#fa8231',
    '#8854d0',
    '#20bf6b',
    '#4b6584',
    '#eb3b5a',
    '#3867d6',
    '#f7b731',
    '#a5b1c2',
    '#0fb9b1',
    '#f6e58d',
    '#7ed6df',
    '#ffbe76',
    '#e056fd',
    '#ff7979',
    '#be2edd',
    '#eb4d4b',
    '#4834d4',
    '#686de0',
    '#badc58',
    '#f9ca24',
    '#22a6b3',
    '#f0932b',
    '#1B9CFC',
    '#F97F51',
    '#EAB543',
    '#6ab04c',
    '#130f40',
    '#30336b',
    '#dff9fb',
    '#95afc0',
    '#c7ecee',
    '#535c68',
    '#F8EFBA',
    '#2C3A47',
    '#82589F',
    '#B33771',
    '#182C61',
    '#D6A2E8',
  ]

  // 取得房主頭貼
  // 判斷有無取得 cookie
  const user = getCookie('user') ? JSON.parse(String(getCookie('user'))) : null
  const [userGuid, setUserGuid] = useState('')
  useEffect(() => {
    setUserGuid(user?.UserGuid)
  }, [user])
  // 夥伴帳號 value
  const memberInputRef = useRef<HTMLInputElement>(null)

  const token = getCookie('auth')

  // 新增夥伴帳號
  const [account, setAccount] = useState<UsersProp[]>(originData.Users || [])
  const addAccount = async () => {
    const token = getCookie('auth')
    if (token === undefined) {
      setLoginConfirm(true)
      // setTimeout(() => {
      //   router.push('/login')
      // }, 2000)
      return
    }
    try {
      const validate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (memberInputRef.current) {
        if (
          !validate.test(memberInputRef.current?.value) ||
          memberInputRef.current?.value === ''
        ) {
          setAccountConfirm(true)
          return
        }
      }

      // 【API】主揪新增被揪
      const resRoomMemberData = await fetch(
        `https://travelmaker.rocket-coding.com/api/rooms/members`,
        {
          method: 'POST',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            RoomGuid: originData.RoomGuid,
            UserEmail: memberInputRef.current?.value,
          }),
        }
      )
      const roomMemberData = await resRoomMemberData.json()

      if (resRoomMemberData.ok) {
        if (memberInputRef.current) {
          memberInputRef.current.value = ''
        }
        const addNewAccount = (roomMemberData: UsersProp | undefined) => {
          if (roomMemberData) {
            setAccount([...account, roomMemberData])
          }
        }
        addNewAccount(roomMemberData)
      }

      if (!resRoomMemberData.ok) {
        setNotMemberMessage(roomMemberData.Message)
        setNotMember(true)
      }
    } catch (err) {
      alert(err)
    }
  }

  // 刪除夥伴帳號
  const deleteAccount = async (index: number, userGuid: string) => {
    try {
      // 【API】主揪刪除被揪.被揪刪除自己
      const resDelAccountData = await fetch(
        `https://travelmaker.rocket-coding.com/api/rooms/members`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            RoomGuid: originData.RoomGuid,
            UserGuid: userGuid,
          }),
        }
      )

      if (resDelAccountData.ok) {
        setAccount((prevAccount) => {
          const newAccount = [...prevAccount]
          newAccount.splice(index, 1)
          return newAccount
        })
      }

      if (resDelAccountData.ok) {
        return
      }
    } catch (err) {
      alert(err)
    }
  }

  // 帳號驗證彈窗
  const [accountConfirm, setAccountConfirm] = useState(false)

  // 尚未成為平台會員彈窗
  const [notMember, setNotMember] = useState(false)
  const [notMemberMessage, setNotMemberMessage] = useState('')

  return (
    <>
      <div className="w-full lg:w-2/3">
        <h2 className="flex items-center space-x-2 mb-4">
          <BsPersonFillAdd className="text-xl" />
          <span className="text-xl">揪人去</span>
        </h2>
        <div className="shadow-[1px_1px_15px_1px_rgba(1,1,15,0.15)] rounded-md px-6 py-5 mb-6 lg:mb-0">
          <div className="flex space-x-4 mb-5">
            <input
              type="text"
              placeholder="請輸入夥伴帳號"
              ref={memberInputRef}
              className="border border-gray-D9 placeholder-gray-D9 bg-[#FBFBFB] rounded-md px-5 py-4 flex-grow focus:outline-none focus:bg-white focus:border-primary"
            />
            <button
              className="border border-gray-D9 text-black rounded-md p-4 hover:bg-primary hover:text-white hover:duration-500"
              onClick={() => {
                addAccount()
              }}
            >
              <MdAdd className="text-2xl" />
            </button>
          </div>

          <div className="bg-[#EAEAEA] border-b border-[#E8E8E8] p-4 rounded-t-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <RiGlobalLine />
                <span>共同編輯</span>
              </div>
            </div>
          </div>

          <div className="h-[180px] min-h-[180px] overflow-y-auto">
            <ul className="bg-[#F7F7F7] flex flex-wrap p-3 rounded-b-md">
              {account?.map(
                (
                  item: {
                    UserGuid: string
                    ProfilePicture: string
                    UserName: string
                  },
                  index: number
                ) => {
                  const pic =
                    item.ProfilePicture === ''
                      ? '/userDefault.png'
                      : `${item.ProfilePicture}`

                  return (
                    <li
                      className="text-center relative w-[100px] mr-2 mb-4"
                      key={index}
                    >
                      <Image
                        width="48"
                        height="48"
                        src={pic}
                        alt="圖片"
                        style={{ border: `2px solid ${colorAry[index]}` }}
                        className={`block mx-auto w-12 h-12 rounded-full bg-[#ccc] border-2 mb-2`}
                      ></Image>
                      <p className="inline-block overflow-hidden text-ellipsis line-clamp-1 w-[100px]">
                        {item.UserName}
                      </p>
                      {item.UserGuid === originData.CreaterGuid ? (
                        <FaCrown className="absolute top-0 right-2 text-secondary rotate-45" />
                      ) : null}

                      {/* 若是主揪，執行前者，若非主揪，執行後者 */}
                      {originData && originData.CreaterGuid === userGuid ? (
                        // 若是主揪，則其餘人顯示 Icon
                        item.UserGuid !== userGuid && (
                          <MdOutlineCancel
                            className="absolute top-0 right-2 text-gray-A8 cursor-pointer"
                            onClick={() => {
                              deleteAccount(index, item.UserGuid)
                            }}
                          />
                        )
                      ) : item.UserGuid === userGuid ? (
                        //  若是被揪，顯示登入者自己的 Icon
                        <MdOutlineCancel
                          className="absolute top-0 right-2 text-gray-A8 cursor-pointer"
                          onClick={() => {
                            deleteAccount(index, item.UserGuid)
                          }}
                        />
                      ) : null}
                    </li>
                  )
                }
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* 輸入帳號格式驗證 */}
      <CustomModal
        modal={accountConfirm}
        setModal={setAccountConfirm}
        typeConfirm
        overflowOpen
        typeConfirmWarnIcon
        typeConfirmText={'請輸入正確的帳號格式'}
        onConfirm={() => {
          setAccountConfirm(false)
        }}
      />

      {/* 帳號非平台會員 */}
      <CustomModal
        modal={notMember}
        setModal={setNotMember}
        typeConfirm
        overflowOpen
        typeConfirmWarnIcon
        typeConfirmText={notMemberMessage}
        onConfirm={() => {
          setNotMember(false)
        }}
      />
    </>
  )
}
