import {
  BsExclamationCircle,
  BsFillBookmarkPlusFill,
  BsFillPeopleFill,
} from 'react-icons/bs'
import Slider from 'react-slick'
import MoreJourney from '@/modules/JourneyPage/MoreJourney'
import SelectSide from '@/modules/JourneyPage/SelectSide'
import { defaultValueProp, randomTourProp } from '@/util/types'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsLink45Deg, BsPlusLg, BsListCheck } from 'react-icons/bs'
import {
  getRandomTours,
  postModifyTour,
  postRoomApi,
  postTours,
} from '@/util/tourApi'
import { useRouter } from 'next/router'
import { defaultValues } from '@/util/selectData'
import TypeLabel from '@/modules/Banner/TypeLabel'
import OpenFormBtn from '@/common/components/OpenFormBtn'
import Image from 'next/image'
import BannerSelectorMobile from '@/modules/Banner/BannerSelectorMobile'
import { getCookie } from 'cookies-next'
import LoadingAnimate from '@/common/components/LoadingAnimate'
import { MdBookmarkBorder, MdSave } from 'react-icons/md'
import { CustomModal } from '@/common/components/CustomModal'

export default function RandamTourLayout({
  data: originData,
  IsTourId,
  TourName: originTourName,
  UserGuid,
  TourId,
}: {
  data: randomTourProp[]
  IsTourId?: boolean
  TourName?: string
  UserGuid?: string
  TourId?: number
}) {
  //token
  const token = getCookie('auth')
  const user = getCookie('user')
    ? JSON.parse(String(getCookie('user')))
    : undefined
  const [userGuid, setUserGuid] = useState(undefined)

  const router = useRouter()
  const currentUrl = router.asPath

  console.log(originData)
  const [data, setData] = useState(originData)
  const [isHidden, setIsHidden] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isChangeTourName, setIsChangeTourName] = useState(false)

  const [tourName, setTourName] = useState(originTourName)
  const [modal, setModal] = useState(false)

  const [postConfirm, setPostConfirm] = useState(false)
  const [modifyConfirm, setModifyConfirm] = useState(false)
  const [getRandomConfirm, setGetRandomConfirm] = useState(false)
  const [changeNameConfirm, setChangeNameConfirm] = useState(false)
  const [loginConflirm, setLoginConflirm] = useState(false)

  const [collectModal, setCollectModal] = useState(false)
  const [anotherRandom, setAnotherRandom] = useState(false)
  const [joinModal, setJoinModal] = useState(false)

  const [linkEffect, setLinkEffect] = useState(false)

  const newCollectTourNameInputRef = useRef<HTMLInputElement>(null)
  const newTourNameInputRef = useRef<HTMLInputElement>(null)
  const TourNameInputRef = useRef<HTMLInputElement>(null)
  const roomNameInputRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, setValue, watch } = useForm<defaultValueProp>(
    { defaultValues: defaultValues }
  )
  const {
    register: register2,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSubmit: handleSubmit2,
    watch: watch2,
    setValue: setValue2,
    formState: { errors: errors2 },
  } = useForm<defaultValueProp>({
    defaultValues,
  })
  const formIdMobile = 'random-tour-form'
  const handleErrors2 = (e: { preventDefault: () => void }) => {
    // 判斷2個都為false時
    if (!watch('nearBy') && !watch('DistrictName').length) {
      alert('錯誤，表單填寫不完整 區域')
      e.preventDefault()
      return
    }
    // 判斷有無沒填寫
    if (Object.keys(errors2).length) {
      alert('錯誤，表單填寫不完整 Type')
    }
  }
  const formId = 'random-tour-form'

  // 電腦版Slider
  const settings = {
    // className: 'center',
    // centerMode: true,
    // centerPadding: '60px',
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    // rows: 4,
  }
  // 手機版Slider
  const settings2 = {
    // className: 'center',
    // centerMode: true,
    // centerPadding: '60px',
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 2,
  }
  useEffect(() => {
    console.log(data)
    // alert('每次setData,重整google地圖')
  }, [data])

  useEffect(() => {
    if (isHidden) {
      document.body.style.overflow = 'auto'
    }
  }, [isHidden])

  useEffect(() => {
    if (TourNameInputRef.current) {
      TourNameInputRef.current.value = String(tourName)
    }
    TourNameInputRef?.current?.focus()
  }, [tourName, isChangeTourName])

  useEffect(() => {
    // user.UserGuid為cookies內的guid 之後會判斷是否與傳進來的行程創建guid是否吻合
    setUserGuid(user?.UserGuid)
  }, [user?.UserGuid])

  return (
    <div className="container lg:pt-20 pt-12 pb-[160px]">
      <CustomModal
        modal={loginConflirm}
        setModal={setLoginConflirm}
        typeConfirm
        typeConfirmWarnIcon
        overflowOpen
        typeConfirmText={'請先登入，自動跳轉中...'}
        onConfirm={() => {
          setLoginConflirm(false)
        }}
      />
      <CustomModal modal={modal} setModal={setModal} wrapper>
        <div className="w-[552px] h-[392px] pt-11 bg-white rounded-xl ">
          {/* 標頭 */}
          <div className="flex justify-center mb-6">
            <BsExclamationCircle className="text-[50px] text-highlight mr-4" />

            <h4 className="text-xl mb-4">
              親愛的用戶您好，
              <br />
              請問您要新建新的行程或取代這組行程呢？
              <span className="text-sm block text-highlight">
                若選擇取代，則喜歡數歸零
              </span>
            </h4>
          </div>
          {/* 行程名稱input */}
          <div className="flex mb-12 justify-center items-center text-xl">
            <p> 行程名稱：</p>
            <input
              ref={newTourNameInputRef}
              type="text"
              className="input-style !max-h-[56px] rounded-md"
            />
          </div>
          <div className="flex justify-center text-xl space-x-12">
            <button
              className="text-highlight border border-highlight py-3 px-9 rounded-md flex items-center"
              onClick={onReplace}
            >
              {/* <BsExclamationCircle className="text-[16px] text-highlight mr-2" /> */}
              取代存檔
            </button>
            <button
              className="text-white bg-primary py-3 px-9 rounded-md"
              onClick={onCopy}
            >
              新建
            </button>
          </div>
        </div>
      </CustomModal>
      <CustomModal
        modal={getRandomConfirm}
        setModal={setGetRandomConfirm}
        typeConfirm
        overflowOpen
        typeConfirmText={'行程取得成功'}
        onConfirm={() => {
          setGetRandomConfirm(false)
        }}
      />
      <CustomModal
        modal={modifyConfirm}
        setModal={setModifyConfirm}
        wrapper
        typeConfirm
        typeConfirmText={'取代存檔成功'}
        onConfirm={() => {
          setModifyConfirm(false)
        }}
      />
      <CustomModal
        modal={postConfirm}
        setModal={setPostConfirm}
        wrapper
        typeConfirm
        typeConfirmText={'新建行程成功'}
        onConfirm={() => {
          setPostConfirm(false)
        }}
      />
      <CustomModal
        modal={changeNameConfirm}
        setModal={setChangeNameConfirm}
        wrapper
        typeConfirm
        typeConfirmText={'更改行程名稱成功'}
        onConfirm={() => {
          setChangeNameConfirm(false)
        }}
      />
      <CustomModal modal={collectModal} setModal={setCollectModal} wrapper>
        <div className="w-[552px] h-[392px] pt-20 bg-white rounded-xl flex flex-col ">
          {/* 標頭 */}
          <div className="flex justify-center items-center mb-12">
            <BsFillBookmarkPlusFill className="text-[50px] text-secondary mr-4" />

            <h4 className="text-2xl">即將創建收藏行程，請輸入行程名稱</h4>
          </div>
          {/* 行程名稱input */}
          <div className="flex mb-12 justify-center items-center text-xl">
            <p> 行程名稱：</p>
            <input
              ref={newCollectTourNameInputRef}
              type="text"
              placeholder="例如:台北一日遊"
              className="input-style !max-h-[56px] rounded-md"
            />
          </div>
          <div className="flex justify-center text-xl space-x-12">
            <button
              className="text-primary border border-primary py-3 px-9 rounded-md flex items-center"
              onClick={() => {
                setCollectModal(false)
              }}
            >
              {/* <BsExclamationCircle className="text-[16px] text-highlight mr-2" /> */}
              取消
            </button>
            <button
              className="text-white bg-primary py-3 px-9 rounded-md"
              onClick={hadlePostTour}
            >
              新建
            </button>
          </div>
        </div>
      </CustomModal>
      <CustomModal modal={joinModal} setModal={setJoinModal} wrapper>
        <div className="w-[552px] h-[392px] pt-7 bg-white rounded-xl flex flex-col ">
          {/* 標頭 */}
          <div className="flex flex-col items-center mb-12">
            <div className="flex justify-center items-center mb-6">
              <BsFillPeopleFill className="text-[50px] text-primary mr-4" />
              邀請朋友
            </div>

            <h4>
              親愛的用戶您好，
              <br />
              歡迎來到Travel Maker，想要揪團一同來編輯行程嗎？
            </h4>
          </div>
          {/* 行程名稱input */}
          <div className="flex mb-12 justify-center items-center text-xl">
            <p> 行程名稱：</p>
            <input
              ref={roomNameInputRef}
              type="text"
              placeholder="例如:台北一日遊"
              className="input-style !max-h-[56px] rounded-md"
            />
          </div>
          <div className="flex justify-center text-xl space-x-12">
            <button
              className="text-primary border border-primary py-3 px-9 rounded-md flex items-center"
              onClick={() => {
                setJoinModal(false)
              }}
            >
              {/* <BsExclamationCircle className="text-[16px] text-highlight mr-2" /> */}
              取消
            </button>
            <button
              className="text-white bg-primary py-3 px-9 rounded-md"
              onClick={handlePostRoom}
            >
              創建房間
            </button>
          </div>
        </div>
      </CustomModal>

      <LoadingAnimate isLoading={isLoading} />

      {/* 手機版表單 */}
      <BannerSelectorMobile
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        formIdMobile={formIdMobile}
        register={register2}
        watch={watch2}
        setValue={setValue2}
        handleErrors={handleErrors2}
      />
      {/* 手機版上方介面 */}
      <div className="lg:hidden mb-14">
        <div className="mb-5">
          <TypeLabel register={register2} setValue={setValue2} watch={watch2} />
        </div>
        <div className="md:mb-6 mb-5">
          <OpenFormBtn isHidden={isHidden} setIsHidden={setIsHidden} />
        </div>
        <button
          form={formIdMobile}
          className="w-full bg-primary text-white py-2 rounded-[10px] mb-6"
        >
          隨機產生行程
        </button>
        <Slider {...settings2}>
          {data?.map((item, i) => {
            return (
              <div
                key={item.AttractionId}
                className="min-w-[180px] h-[180px] relative shadow"
              >
                <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(255,255,255,0.0)] to-black"></div>
                <div className="absolute text-white top-1 left-1 w-5 h-5 bg-primary rounded-full flex justify-center items-center">
                  {i + 1}
                </div>
                <div className="absolute text-center min-w-[180px] max-w-[180px] bottom-1 left-1/2 translate-x-[-50%] text-white ">
                  {item.AttractionName}
                </div>
                <Image
                  alt=""
                  src={item.ImageUrl}
                  width={652}
                  height={180}
                  className="object-cover w-full h-full"
                  priority
                  blurDataURL="/Group 329.png"
                  placeholder="blur"
                />
              </div>
            )
          })}
        </Slider>
      </div>

      {/* 電腦版所有介面 */}
      <div className="flex flex-wrap mb-[60px] lg:mb-[180px]">
        {/* 排行程及連結 佔100%寬度 */}
        <div className="hidden lg:flex w-full mb-3 space-x-6 items-center">
          {/* 排行程文字 */}
          <div className="lg:w-[264px]">
            <h2 className="hidden lg:flex items-center text-xl">
              <BsListCheck className="mr-2 text-2xl" />
              排行程
            </h2>
          </div>
          {/* 懶人行程連結 */}
          {/* 判斷是否在id規劃頁 */}
          {IsTourId ? (
            <div className="flex items-center">
              <button
                onClick={() => {
                  handleLink()
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
              {isChangeTourName ? (
                <div className="flex items-center max-h-[28px] cursor-pointer">
                  <input
                    type="text"
                    placeholder="請輸入新的行程名稱"
                    ref={TourNameInputRef}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        setTourName(TourNameInputRef?.current?.value)
                        setChangeNameConfirm(true)
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
                    onClick={() => {
                      if (TourNameInputRef?.current?.value !== '') {
                        setTourName(TourNameInputRef?.current?.value)
                        setChangeNameConfirm(true)
                      }
                    }}
                  >
                    儲存
                  </button>
                </div>
              ) : (
                <div
                  className="font-bold relative"
                  onClick={() => {
                    if (userGuid === UserGuid) {
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
                    } absolute text-normal !text-primary opacity-0 top-0 left-[calc(100%+8px)]`}
                  >
                    copied！
                  </div>
                </div>
              )}
            </div>
          ) : (
            // 尚未進入id規劃頁
            <div className="flex-grow ">
              <button
                className="group relative flex px-2 items-center text-gray-73 text-xl border border-black rounded-md"
                onClick={() => {
                  handleLink()
                  setLinkEffect(true)
                }}
              >
                <BsLink45Deg className="mr-2 text-2xl text-black duration-100 group-active:text-primary group-active:border-black" />
                複製連結
                <div
                  onAnimationEnd={() => {
                    setLinkEffect(false)
                  }}
                  className={`${
                    linkEffect && 'animate-fade-in-out'
                  } absolute text-normal !text-primary opacity-0 left-[calc(100%+8px)]`}
                >
                  copied！
                </div>
              </button>
            </div>
          )}
        </div>
        {/* 篩選器及行程,地圖 */}
        <div className="flex justify-between w-full">
          {/* 篩選器 */}
          <div className="mr-6 hidden lg:block">
            <SelectSide
              formId={formId}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              register={register}
              setValue={setValue}
              watch={watch}
            />
            <button
              form={formId}
              className="text-lg font-bold lg:text-xl py-2 lg:py-3 w-full bg-primary text-white rounded-md hover:bg-primary-tint duration-100"
            >
              隨機產生行程
            </button>
          </div>
          {/* 行程,地圖 */}
          <div className="flex-grow max-w-[840px]">
            {/* Swiper圖片 */}
            <div className="hidden lg:block max-h-[180px] mb-8">
              <Slider {...settings}>
                {data?.map((item, i) => {
                  return (
                    <div
                      key={item.AttractionId + 1}
                      className="min-w-[180px] h-[180px] relative cursor-grab shadow"
                    >
                      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(255,255,255,0.0)] to-black"></div>

                      <div className="absolute text-white top-1 left-1 w-5 h-5 bg-primary rounded-full flex justify-center items-center">
                        {i + 1}
                      </div>

                      <div className="absolute text-center min-w-[180px] max-w-[180px] bottom-1 left-1/2 translate-x-[-50%] text-red-100 ">
                        {item.AttractionName}
                      </div>
                      <Image
                        alt=""
                        src={item.ImageUrl}
                        width={652}
                        height={180}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )
                })}
              </Slider>
            </div>
            {/* 地圖 */}
            <div className="mb-12 min-h-[336px] lg:min-h-[576px] bg-[#D7D7D7] rounded-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d14459.774055448219!2d121.49936893054726!3d25.035990943540952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x3442a94a4ed4888b%3A0x7880a95f29f4878e!2z5Zyw5bmz57ea5Z-65Zyw!3m2!1d25.0239646!2d121.5094846!4m5!1s0x3442a90e8737b2f7%3A0x6b6ee112e9e7c58b!2z5bCP5ZCz54mb6IKJ6bq1IDEwOOWPsOWMl-W4guiQrOiPr-WNgOa0m-mZveihlzQ1LTEx6Jmf!3m2!1d25.047628399999997!2d121.508326!5e0!3m2!1szh-TW!2stw!4v1680440395475!5m2!1szh-TW!2stw"
                className="w-full h-full min-h-[336px] lg:min-h-[576px] rounded-md"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            {/* 邀請收藏按鈕 */}
            <div className="flex justify-end">
              <button
                disabled={data[0].AttractionId ? false : true}
                className="inline-flex text-xl bg-primary py-2 lg:py-3 px-6 lg:px-10 mr-10 justify-center items-center rounded-md text-white hover:bg-primary-tint duration-100 disabled:bg-primary/25"
                onClick={async () => {
                  if (token === undefined) {
                    setLoginConflirm(true)
                    //請先登入
                    setTimeout(() => {
                      router.push('/login')
                    }, 2000)
                    return
                  }
                  setJoinModal(true)
                }}
              >
                <BsPlusLg className="text-lg mr-2" />
                邀請
              </button>
              {IsTourId && userGuid === UserGuid ? (
                <button
                  className={`${
                    anotherRandom && '!bg-secondary hover:!bg-secondary/75'
                  } inline-flex text-xl bg-primary py-2 lg:py-3 px-6 lg:px-10 justify-center items-center rounded-md text-white hover:bg-secondary duration-100`}
                  onClick={() => {
                    setModal(!modal)
                  }}
                >
                  <MdSave className="text-lg mr-2" />
                  儲存
                </button>
              ) : (
                <button
                  className="inline-flex text-xl bg-primary py-2 lg:py-3 px-6 lg:px-10 justify-center items-center rounded-md text-white hover:bg-primary-tint duration-100 disabled:bg-primary/25"
                  disabled={data[0].AttractionId ? false : true}
                  onClick={() => {
                    if (token === undefined) {
                      setLoginConflirm(true)
                      //請先登入
                      setTimeout(() => {
                        router.push('/login')
                      }, 2000)
                      return
                    }

                    setCollectModal(true)
                    setTimeout(() => {
                      newCollectTourNameInputRef.current?.focus()
                    })
                  }}
                >
                  <MdBookmarkBorder className="text-lg mr-2" />
                  收藏
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 更多行程 */}
      <MoreJourney />
    </div>
  )

  async function onSubmit(data: defaultValueProp) {
    try {
      setIsLoading(true)
      // 缺geo,故先判斷鄰近值,在做函式返回newData
      const newData = data.nearBy ? handleNearBy(true) : handleNearBy(false)
      alert('這先留著' + JSON.stringify(newData))
      const res = await getRandomTours(newData)
      if (res.ok) {
        const resJSON = await res.json()
        setGetRandomConfirm(true)
        setData(resJSON)
        setAnotherRandom(true)
        setIsLoading(false)
        return
      }
      throw new Error('錯誤,or沒找到景點')
    } catch (err) {
      setIsLoading(false)
      alert(err)
    }

    function handleNearBy(bool: boolean) {
      let newData
      // 目前只有false狀態，尚缺true狀態
      if (!bool) {
        // 取得google定位，設定經緯度
        newData = { Nlat: 0, Elong: 0, ...data }
        // 取得鎖點(懶人頁較簡易）
        newData.AttractionId = Array(4).fill(0)
        //刪除鄰近
        delete newData.nearBy
      }
      return newData
    }
  }

  async function handleLink() {
    const idParams = data
      .map((item) => {
        return `id=${item.AttractionId}`
      })
      .join('&')
    // 複製連結
    if (IsTourId) {
      navigator.clipboard.writeText(`http://localhost:3000${currentUrl}`)
      return
    }
    navigator.clipboard.writeText(
      `http://localhost:3000/random-tour?${idParams}`
    )
  }

  // 收藏 (未有token->收藏按鈕時就先擋 並導航登入
  async function hadlePostTour() {
    try {
      setCollectModal(true)
      // 用戶輸入行程名稱
      const TourName = newCollectTourNameInputRef?.current?.value
      if (TourName === null || TourName === '') {
        return
      }
      // 行程id陣列
      const AttractionId = data.map(
        (item: { AttractionId: number }) => item.AttractionId
      )

      setIsLoading(true)
      const res = await postTours(String(token), String(TourName), AttractionId)
      console.log(res.status)

      if (res.ok) {
        setIsLoading(false)
        setPostConfirm(true)
        setCollectModal(false)
        //200
        const resJSON = await res.json()
        router.push(`random-tour/${resJSON.TourId}`)
        return
      }
      throw new Error('不知名錯誤')
    } catch (err) {
      // 請登入
      alert('錯誤')
      alert(err)
      router.push('/login')
    }
  }

  // 新建(複製 已有token
  async function onCopy() {
    try {
      if (newTourNameInputRef?.current?.value === '') {
        return
      }
      setIsLoading(true)
      const newTourName = newTourNameInputRef?.current?.value

      const AttractionId = data.map(
        (item: { AttractionId: number }) => item.AttractionId
      )

      const res = await postTours(
        String(token),
        String(newTourName),
        AttractionId
      )

      if (res.ok) {
        //200
        const resJSON = await res.json()
        setPostConfirm(true)
        setTimeout(() => {
          router.push(`/random-tour/${resJSON.TourId}`)
        }, 1000)
        if (newTourNameInputRef.current) {
          newTourNameInputRef.current.value = ''
        }
        setTourName(newTourName)
        setModal(false)
        setIsLoading(false)
        setAnotherRandom(false)
        return
      }

      // 請登入
      if (res.status === 401) {
        alert('請重新登入')
        router.push('/login')
        return
      }

      throw new Error('不知名錯誤')
    } catch (err) {
      alert(err)
      setIsLoading(false)
    }
  }

  // 取代(已經有token)
  async function onReplace() {
    try {
      if (newTourNameInputRef?.current?.value === '') {
        return
      }
      setIsLoading(true)

      const TourName = newTourNameInputRef?.current?.value
      const AttractionId = data.map(
        (item: { AttractionId: number }) => item.AttractionId
      )

      const res = await postModifyTour(
        Number(TourId),
        String(token),
        String(TourName),
        AttractionId
      )

      if (res.ok) {
        if (newTourNameInputRef.current) {
          newTourNameInputRef.current.value = ''
        }
        setTourName(TourName)
        setIsLoading(false)
        setModal(false)
        setModifyConfirm(true)
        setAnotherRandom(false)
        return
      }

      throw new Error('不知名錯誤')
    } catch (err) {
      alert(err)
      setIsLoading(false)
    }
  }
  async function handlePostRoom() {
    try {
      if (
        roomNameInputRef.current?.value === '' ||
        roomNameInputRef.current?.value === null
      ) {
        return
      }
      setIsLoading(true)
      const RoomName = roomNameInputRef.current?.value
      const Attractions = data.map(
        (item: { AttractionId: number }) => item.AttractionId
      )
      const res = await postRoomApi(
        String(token),
        String(RoomName),
        Attractions
      )
      if (res.ok) {
        const resJSON = await res.json()
        setIsLoading(false)
        setJoinModal(false)
        setPostConfirm(true)
        setTimeout(async () => {
          setIsLoading(true)
          await router.push(`/planning-tour/${resJSON.RoomGuid}`)
          setIsLoading(false)
        }, 1500)
        return
      }
      throw new Error('不知名錯誤')
    } catch (err) {
      alert(err)
      setIsLoading(false)
    }
  }
}
