import {
  BsExclamationCircle,
  BsFillBookmarkPlusFill,
  BsFillPeopleFill,
} from 'react-icons/bs'
import Slider from 'react-slick'
import MoreJourney from '@/modules/JourneyPage/MoreJourney'
import SelectSide from '@/modules/JourneyPage/SelectSide'
import { defaultValueProp, MoreTourProp, randomTourProp } from '@/util/types'
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
import { getCookie, hasCookie } from 'cookies-next'
import LoadingAnimate from '@/common/components/LoadingAnimate'
import { MdBookmarkBorder, MdSave } from 'react-icons/md'
import { CustomModal } from '@/common/components/CustomModal'
import { useDispatch, useSelector } from 'react-redux'
import { saveForm, getToursForm } from '@/redux/toursFormSlice'
import { getRandomTour, saveTours } from '@/redux/randomTourSlice'
// import { geoPromise } from '@/util/constans'

interface PositionData {
  latitude: number
  longitude: number
}

export default function RandamTourLayout({
  data: originData,
  IsTourId,
  TourName: originTourName,
  UserGuid,
  TourId,
  moreData,
}: {
  data: randomTourProp[]
  IsTourId?: boolean
  TourName?: string
  UserGuid?: string
  TourId?: number
  moreData: MoreTourProp[]
}) {
  const router = useRouter()
  const { query } = useRouter()
  const currentUrl = router.asPath
  const dispatch = useDispatch()
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''

  const URL = `${origin}`

  // =========Redux表單=========
  const formValue = useSelector(getToursForm)

  // =========token,user State=========
  const token = getCookie('auth')
  const user = getCookie('user')
    ? JSON.parse(String(getCookie('user')))
    : undefined
  const [userGuid, setUserGuid] = useState(undefined)

  // =========隨機資料state 修改為Redux行程=========
  const [idData, setIdData] = useState(originData)
  const data = useSelector(getRandomTour)

  // =========地圖需要的中間點 變數=========
  const waypoint =
    (IsTourId ? idData.length : data.length) >= 2
      ? '&waypoints=' +
        (
          (IsTourId ? idData : data)
            .filter((item, i) => {
              if (i === 0 || i === data.length - 1) {
                return false
              }
              return item.AttractionName
            })
            .map((item) => item.AttractionName)
            .join(' 台北市|') + ' 台北市'
        ).replace(/&/g, ' ')
      : null

  // =========手機版表單state=========
  const [isHidden, setIsHidden] = useState(true)

  // =========各種modal state=========
  const [isLoading, setIsLoading] = useState(false)
  const [isChangeTourName, setIsChangeTourName] = useState(false)

  const [handleErrorConfirm, setHandleErrorConfirm] = useState(false)
  const [handleErrorConfirmText, setHandleErrorConfirmText] = useState('')

  const [tourName, setTourName] = useState(originTourName)
  const [modal, setModal] = useState(false)

  const [postConfirm, setPostConfirm] = useState(false)
  const [modifyConfirm, setModifyConfirm] = useState(false)
  const [changeNameConfirm, setChangeNameConfirm] = useState(false)
  const [loginConflirm, setLoginConflirm] = useState(false)

  //===取得行程系列
  const [getRandomConfirm, setGetRandomConfirm] = useState(false)
  const [getRandomConfirmWarn, setGetRandomConfirmWarn] = useState(false)
  const [getRandomConfirmText, setGetRandomConfirmText] = useState('')

  const [collectModal, setCollectModal] = useState(false)
  // ===unSaved state===
  const [anotherRandom, setAnotherRandom] = useState(false)
  const [joinModal, setJoinModal] = useState(false)

  // =========link特效state=========
  const [linkEffect, setLinkEffect] = useState(false)

  // ========= useRef =========
  const newCollectTourNameInputRef = useRef<HTMLInputElement>(null)
  const newTourNameInputRef = useRef<HTMLInputElement>(null)
  const TourNameInputRef = useRef<HTMLInputElement>(null)
  const roomNameInputRef = useRef<HTMLInputElement>(null)
  const sliderRef = useRef<Slider>(null)
  const sliderMobileRef = useRef<Slider>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  // ========= RHF 表單 =========
  const formId = 'random-tour-form'
  const formIdMobile = 'random-tour-form-Mobile'
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<defaultValueProp>({
    defaultValues: formValue ? formValue : defaultValues,
  })
  const {
    register: register2,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSubmit: handleSubmit2,
    watch: watch2,
    setValue: setValue2,
    formState: { errors: errors2 },
  } = useForm<defaultValueProp>({
    defaultValues: formValue ? formValue : defaultValues,
  })

  // ========= RHF 錯誤捕捉 p.s alert記得關 =========
  const handleErrors = (e: { preventDefault: () => void }) => {
    // 判斷2個都為false時
    if (!watch('nearBy') && !watch('DistrictName').length) {
      setHandleErrorConfirm(true)
      setHandleErrorConfirmText('填寫不完整 (區域)')
      e.preventDefault()
      return
    }
    if (Object.keys(errors).length) {
      setHandleErrorConfirm(true)
      setHandleErrorConfirmText('填寫不完整 (行程類別)')
    }
  }

  // =========電腦版Slider=========
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  }
  // =========手機版Slider=========
  const settings2 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 2,
  }

  //=========手機版表單 限制滾動useEffect=========
  useEffect(() => {
    if (isHidden) {
      document.body.style.overflow = 'auto'
    }
  }, [isHidden])

  // =========更換行程名稱focus useEffect=========
  useEffect(() => {
    if (TourNameInputRef.current) {
      TourNameInputRef.current.value = String(tourName)
    }
    TourNameInputRef?.current?.focus()
  }, [tourName, isChangeTourName])

  //=========不同用戶顯示不同UI useEffect=========
  useEffect(() => {
    // user.UserGuid為cookies內的guid 之後會判斷是否與傳進來的行程創建guid是否吻合
    setUserGuid(user?.UserGuid)
  }, [user?.UserGuid])

  useEffect(() => {
    setIdData(originData)
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0)
    }
    if (sliderMobileRef.current) {
      sliderMobileRef.current.slickGoTo(0)
    }
  }, [query])

  return (
    <div className="container lg:pt-20 pt-12 pb-[160px]">
      {/* 重構請用這個Modal */}
      <CustomModal
        modal={handleErrorConfirm}
        setModal={setHandleErrorConfirm}
        typeConfirm
        typeConfirmWarnIcon
        typeConfirmText={handleErrorConfirmText}
        onConfirm={() => {
          setHandleErrorConfirm(false)
        }}
      />
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
        typeConfirmWarnIcon={getRandomConfirmWarn}
        overflowOpen
        typeConfirmText={getRandomConfirmText}
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
            <div className="flex justify-center items-center mb-6 text-2xl">
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
        handleSubmit={handleSubmit2}
        onSubmit={onSubmit}
        formIdMobile={formIdMobile}
        register={register2}
        watch={watch2}
        setValue={setValue2}
        errors={errors2}
        // handleErrors={handleErrors2}
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
          onClick={(e) => {
            // 表單2
            const handleErrors2 = (e: { preventDefault: () => void }) => {
              // 判斷2個都為false時
              if (!watch2('nearBy') && !watch2('DistrictName').length) {
                alert('填寫不完整 (區域)')
                e.preventDefault()
                return
              }
              // 判斷有無沒填寫
              if (Object.keys(errors2).length) {
                alert('填寫不完整 (行程類別)')
              }
            }
            handleErrors2(e)
          }}
        >
          隨機產生行程
        </button>
        <Slider {...settings2} ref={sliderMobileRef}>
          {(IsTourId ? idData : data)?.map((item, i) => {
            return (
              <div
                key={item.AttractionId}
                className="min-w-[180px] h-[180px] relative shadow"
              >
                <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(255,255,255,0.0)] to-black"></div>
                <div className="absolute text-white top-1 left-1 w-5 h-5 bg-primary rounded-full flex justify-center items-center">
                  {i + 1}
                </div>
                <a
                  target="_blank"
                  href={`${URL}`}
                  rel="noopener noreferrer"
                  className="cursor-pointer absolute text-center min-w-[180px] max-w-[180px] bottom-1 left-1/2 translate-x-[-50%] text-white hover:underline hover:text-primary-tint active:text-primary "
                >
                  {item.AttractionName}
                </a>
                <Image
                  alt=""
                  src={item.ImageUrl}
                  width={652}
                  height={180}
                  className="object-cover w-full h-full"
                  priority
                  blurDataURL="/logo.png"
                  placeholder="blur"
                />
              </div>
            )
          })}
        </Slider>
      </div>

      {/* 電腦版所有介面 */}
      <div className="flex flex-wrap mb-[60px] lg:mb-[180px]" ref={titleRef}>
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
                    } z-[-1] absolute text-normal !text-primary opacity-0 top-0 left-[calc(100%+8px)]`}
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
                  } z-[-1] absolute text-normal !text-primary opacity-0 left-[calc(100%+8px)]`}
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
              setIsLoading={setIsLoading}
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
              onClick={handleErrors}
            >
              隨機產生行程
            </button>
          </div>
          {/* 行程,地圖 */}
          <div className="flex-grow max-w-[840px]">
            {/* Swiper圖片 */}
            <div className="hidden lg:block max-h-[180px] mb-8">
              <Slider {...settings} ref={sliderRef}>
                {(IsTourId ? idData : data)?.map((item, i) => {
                  return (
                    <div
                      key={item.AttractionId + 1}
                      className="min-w-[180px] h-[180px] relative cursor-grab shadow"
                    >
                      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(255,255,255,0.0)] to-black"></div>

                      <div className="absolute text-white top-1 left-1 w-5 h-5 bg-primary rounded-full flex justify-center items-center">
                        {i + 1}
                      </div>

                      <a
                        target="_blank"
                        href={`/hot-topics/attractions/${item.AttractionId}`}
                        className="cursor-pointer hover:underline hover:text-primary-tint active:text-primary  absolute text-center min-w-[180px] max-w-[180px] bottom-1 left-1/2 translate-x-[-50%] text-red-100 "
                      >
                        {item.AttractionName}
                      </a>
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
            {data[0].AttractionId || IsTourId ? (
              <div className="mb-9 min-h-[336px] lg:min-h-[576px] bg-[#D7D7D7] rounded-md">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/directions?key=${
                    process.env.NEXT_PUBLIC_YANG_GOOGLE_KEY
                  }&origin=${(
                    (IsTourId ? idData[0] : data[0]).AttractionName + ' 台北市'
                  ).replace(/&/g, ' ')}${waypoint}
                  &destination=${(
                    (IsTourId
                      ? idData[idData.length - 1]
                      : data[data.length - 1]
                    ).AttractionName + ' 台北市'
                  ).replace(/&/g, ' ')}`}
                  // &mode=${'walking'}
                  className="w-full h-full min-h-[336px] lg:min-h-[576px] rounded-md"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            ) : (
              <div className="mb-9 min-h-[336px] lg:min-h-[576px] bg-[#D7D7D7] rounded-md relative">
                <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                  趕緊按下
                  <span className="text-primary">隨機產生行程</span>
                  獲得行程地圖吧！
                </span>
              </div>
            )}
            {/* 邀請收藏按鈕 */}
            <div className="flex justify-end">
              <button
                disabled={
                  (IsTourId ? idData : data)[0].AttractionId ? false : true
                }
                className="inline-flex text-xl bg-primary py-2 lg:py-3 px-6 lg:px-10 mr-10 justify-center items-center rounded-md text-white hover:bg-primary-tint duration-100 disabled:bg-primary/25"
                onClick={async () => {
                  if (!hasCookie('auth')) {
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
                  disabled={
                    (IsTourId ? idData : data)[0].AttractionId ? false : true
                  }
                  onClick={() => {
                    if (!hasCookie('auth')) {
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
      <MoreJourney moreData={moreData} />
    </div>
  )

  async function onSubmit(data: defaultValueProp) {
    setIsLoading(true)
    try {
      dispatch(saveForm(data))

      // 缺geo,故先判斷鄰近值,在做函式返回newData
      const newData = await (data.nearBy
        ? handleNearBy(true)
        : handleNearBy(false))
      // alert('這先留著' + JSON.stringify(newData))

      // ===打post===
      const res = await getRandomTours(newData)

      // ===res.ok===
      if (res.ok) {
        const resJSON = await res.json()
        //==設置Redux Tours==
        if (IsTourId) {
          setIdData(resJSON)
        } else {
          dispatch(saveTours(resJSON))
        }

        setGetRandomConfirmWarn(false)
        setGetRandomConfirmText('行程取得成功')

        setIsHidden(true)
        setGetRandomConfirm(true)
        setAnotherRandom(true)
        setIsLoading(false)
        if (sliderRef.current) {
          sliderRef.current.slickGoTo(0)
        }
        if (sliderMobileRef.current) {
          sliderMobileRef.current.slickGoTo(0)
        }
        // ==隨機產生成功後移動到景點Slider處==
        window.scrollTo({
          top: 120,
          behavior: 'smooth',
        })
        return
      }

      // ===throw Error===
      throw new Error('錯誤,or沒找到景點')
    } catch (err) {
      setGetRandomConfirm(true)
      setGetRandomConfirmWarn(true)
      setGetRandomConfirmText('錯誤，無相鄰景點')
      setIsLoading(false)
      // alert(err)
    }

    // ======handleNearBy控制鄰近經緯 ======
    async function handleNearBy(bool: boolean) {
      const geoPromise = new Promise<PositionData>((reslove, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords
            reslove({ latitude, longitude })
          },
          () => {
            reject()
          }
        )
      })
      let newData
      // 目前只有false狀態
      if (!bool) {
        // 取得google定位，設定經緯度
        newData = { Nlat: 0, Elong: 0, ...data }
        // 取得鎖點(懶人頁較簡易）
        newData.AttractionId = Array(4).fill(0)
        //刪除鄰近
        delete newData.nearBy
      } else {
        const res = await geoPromise
        const Nlat = res.latitude
        const Elong = res.longitude
        // 取得google定位，設定經緯度
        newData = { Nlat, Elong, ...data }
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
      // !這邊記得換網域
      navigator.clipboard.writeText(`${URL}${currentUrl}`)
      return
    }
    navigator.clipboard.writeText(
      // !這邊記得換網域
      `${URL}${router.pathname}?${idParams}`
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
      const AttractionId = (IsTourId ? idData : data).map(
        (item: { AttractionId: number }) => item.AttractionId
      )

      setIsLoading(true)
      const res = await postTours(String(token), String(TourName), AttractionId)

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
      // alert('錯誤')
      // alert(err)
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

      const AttractionId = (IsTourId ? idData : data).map(
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
        // alert('請重新登入')
        router.push('/login')
        return
      }

      throw new Error('不知名錯誤')
    } catch (err) {
      // alert(err)
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
      const AttractionId = (IsTourId ? idData : data).map(
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
      // alert(err)
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
      const Attractions = (IsTourId ? idData : data).map(
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
      // alert(err)
      setIsLoading(false)
    }
  }
  async function handleChangeName() {
    setIsLoading(true)
    const newName = TourNameInputRef?.current?.value
    try {
      if (newName !== '' && newName !== undefined) {
        const res = await fetch(
          `https://travelmaker.rocket-coding.com/api/tours/${query.id}/rename`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: String(token),
            },
            body: JSON.stringify(newName),
          }
        )
        if (res.ok) {
          setTourName(newName)
          setChangeNameConfirm(true)
        }
      }
    } catch (err) {
    } finally {
      setIsLoading(false)
    }
  }
}
