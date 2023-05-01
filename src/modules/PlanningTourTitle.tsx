import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { BsLink45Deg, BsListCheck } from 'react-icons/bs'
export default function PlanningTourTitle({
  RoomName,
  CreaterGuid,
  setSuccessConfirmWarn,
  setSuccessConfirmModal,
  setSuccessConfirmText,
  setIsLoading,
}: {
  RoomName: string
  CreaterGuid: string
  setIsLoading: React.Dispatch<boolean>
  setSuccessConfirmWarn: React.Dispatch<boolean>
  setSuccessConfirmModal: React.Dispatch<boolean>
  setSuccessConfirmText: React.Dispatch<string>
}) {
  const router = useRouter()
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''
  const URL = `${origin}`
  const { id } = useRouter().query

  const [tourName, setTourName] = useState(RoomName)
  const [linkEffect, setLinkEffect] = useState(false)
  const [isChangeTourName, setIsChangeTourName] = useState(false)
  const TourNameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // RoomName應該會變成state
    if (TourNameInputRef.current) {
      TourNameInputRef.current.value = String(tourName)
    }
    TourNameInputRef?.current?.focus()
  }, [tourName, isChangeTourName])

  return (
    <div className="hidden lg:flex w-full mb-3 space-x-6 items-center">
      <div className="lg:w-[264px]">
        <h2 className="hidden lg:flex items-center text-xl ">
          <BsListCheck className="mr-2 text-2xl " />
          排行程
        </h2>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => {
            navigator.clipboard.writeText(`${URL}${router.asPath}`)
            setLinkEffect(true)
          }}
          className="flex items-center group"
        >
          <div className="w-[28px] h-[28px] mr-2  border border-black rounded-md flex justify-center items-center  group-hover:border-primary">
            <BsLink45Deg className="text-lg text-black group-hover:text-primary group-active:text-primary-tint" />
          </div>
          <div className="font-bold group-hover:text-primary group-active:text-primary-tint">
            行程名稱：
          </div>
        </button>
        {isChangeTourName ? ( //isChangeTourName
          <div className="flex items-center max-h-[28px] cursor-pointer">
            <input
              type="text"
              placeholder="請輸入新的行程名稱"
              ref={TourNameInputRef}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleChangeName()
                  if (TourNameInputRef.current) {
                    TourNameInputRef.current.blur()
                  }
                }
              }}
              onBlur={() => {
                setTimeout(() => {
                  setIsChangeTourName(!isChangeTourName)
                }, 100)
              }}
              className="w-[160px] max-h-[28px] px-1 py-1 border border-[#f5f5f5] bg-gary-[#fafafa] mr-2 focus-visible:outline-secondary"
            />
            <button
              className="py-1 px-8 text-white bg-primary rounded-md"
              onClick={handleChangeName}
            >
              儲存
            </button>
          </div>
        ) : (
          <div
            className="font-bold relative"
            onClick={() => {
              const user = JSON.parse(String(getCookie('user')))
              // ==取得guid,判斷是否為房主==
              if (user.UserGuid === CreaterGuid) {
                setIsChangeTourName(!isChangeTourName)
              }
            }}
          >
            {tourName}
            <div
              onAnimationEnd={() => {
                setLinkEffect(false)
              }}
              className={`${
                linkEffect && 'animate-fade-in-out'
              } z-[-1] absolute text-normal !text-primary opacity-0 top-0 left-[calc(100%+8px)]`}
            >
              copied！
            </div>
          </div>
        )}
      </div>
    </div>
  )

  async function handleChangeName() {
    setIsLoading(true)
    try {
      const newName = TourNameInputRef?.current?.value
      if (newName !== '' && newName !== undefined) {
        const token = getCookie('auth')
        const res = await fetch(
          'https://travelmaker.rocket-coding.com/api/rooms/rename',
          {
            method: 'PUT',
            headers: {
              Authorization: String(token),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              RoomGuid: id,
              RoomName: newName,
            }),
          }
        )
        if (res.ok) {
          setTourName(newName)
          setSuccessConfirmWarn(false)
          setSuccessConfirmModal(true)
          setSuccessConfirmText('房間名稱修改成功')
          return
        }
        throw new Error('不知名錯誤')
      }
    } catch (err) {
      setSuccessConfirmWarn(true)
      setSuccessConfirmModal(true)
      setSuccessConfirmText(String(err))
    } finally {
      setIsLoading(false)
    }
  }
}
