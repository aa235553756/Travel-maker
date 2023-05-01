import PlanningTourStoreTours from './../../modules/PlanningTourStoreTours'
import TourMap from './../../modules/TourMap'
import PlanningTourTab from './../../modules/PlanningTourTab'
import PlanningTourTitle from './../../modules/PlanningTourTitle'
import React, { useEffect, useState } from 'react'
import VoteDate from '@/modules/JourneyPage/VoteDate'
import InvitePeople from '@/modules/JourneyPage/InvitePeople'
import MoreJourney from '@/modules/JourneyPage/MoreJourney'
import SelectSide from '@/modules/JourneyPage/SelectSide'
import { MdOutlineCancel, MdSave } from 'react-icons/md'
import {
  defaultValueProp,
  MoreTourProp,
  RoomAttractionsProp,
} from '@/util/types'
import { useForm } from 'react-hook-form'
import { defaultValues } from '@/util/selectData'

import {
  DndContext,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableItem } from '@/modules/SoratbleItems'
import DroppableBig from '@/modules/DroppableBig'
import { CustomModal } from '@/common/components/CustomModal'
import DragStateDIV from '@/modules/DragStateDIV'
import { postRoomTours } from '@/util/roomApi'
import LoadingAnimate from '@/common/components/LoadingAnimate'
import { useRouter } from 'next/router'
import { getRandomTours } from '@/util/tourApi'
import { getCookie } from 'cookies-next'
import PlanningTourSearchModal from '@/modules/PlanningTourSearchModal'
import { BsXCircle } from 'react-icons/bs'
import Head from 'next/head'
// import { geoPromise } from '@/util/constans'

interface VoteDatesProp {
  VoteDateId: number
  Date: string
  Count: number
  IsVoted: boolean
  UserGuid?: string
}

interface PositionData {
  latitude: number
  longitude: number
}

interface paramsProp {
  id: number
}

interface PlanningTour {
  AttrationsData: RoomAttractionsProp[]
  RoomName: string
  RoomGuid: string
  CreaterGuid: string
  VoteDates: VoteDatesProp[]
}

interface Attractions {
  IsCollect: boolean
  AttractionId: number
  AttractionName: string
  CityDistrict: string
  AverageScore: number
  Category: string[]
  ImageUrl: string
}

interface HotAttrProps {
  TotalPages: number
  TotalItem: number
  Attractions: Attractions[]
}

export default function PlanningTour({
  data: originData,
  hotAttrData,
  moreData,
}: {
  data: PlanningTour
  hotAttrData: HotAttrProps
  moreData: MoreTourProp[]
}) {
  const router = useRouter()
  const user = getCookie('user')
    ? JSON.parse(String(getCookie('user')))
    : undefined

  // =========原始資料,其他UI=========
  const [data] = useState(originData)
  const [tabPos, setTabPos] = useState('備用景點')
  const [unSaved, setUnSaved] = useState(false)

  // =========各種Modal State=========
  const [isLoading, setIsLoading] = useState(false)
  const [loginConfirm, setLoginConfirm] = useState(false)
  const [successConfirmWarn, setSuccessConfirmWarn] = useState(false)
  const [successConfirmModal, setSuccessConfirmModal] = useState(false)
  const [successConfirmText, setSuccessConfirmText] = useState('')

  // ============sort拖拉State=========
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8])

  //=========上方判斷是否顯示的boolean陣列=========
  const newIsDropped = JSON.parse(JSON.stringify(data.AttrationsData))
  const [isDropped, setIsDropped] = useState(
    // [true, false, true, false, true, false, true, false]
    Array(8)
      .fill('')
      .map((item, index) => {
        const booleanAry = newIsDropped.filter((item: RoomAttractionsProp) => {
          return item.Order === index + 1
        })
        if (booleanAry[0]) {
          return true
        }
        return false
      })
  )
  //=========上方內存景點資料=========
  const newSortData = JSON.parse(JSON.stringify(data))
  const [sortData, setSortData] = useState(
    newSortData.AttrationsData.filter(
      (item: RoomAttractionsProp) => item.Order !== 0
    )
  )

  //=========上方由判斷顯示的實際HTML元素陣列=========
  const newDraggableState = JSON.parse(JSON.stringify(data))
  const [draggableState, setDraggableState] = useState(
    // [<DragStateDIV></DragStateDIV>,<></>,<></>,<></>,<></>,<></>,<></>,<></>]
    Array(8)
      .fill('')
      .map((item, index) => {
        // order與index匹配回傳true,使得DragState位置能夠是正確order
        const orderData = newDraggableState.AttrationsData.filter(
          (item: RoomAttractionsProp) => {
            if (item.Order === index + 1) {
              return true
            }
          }
        )
        return orderData[0] ? (
          <DragStateDIV key={orderData[0].Order} item={orderData[0]} />
        ) : (
          <></>
        )
      })
  )

  // =========下方備用景點資料=========
  const newStoreTours = JSON.parse(JSON.stringify(data))
  const [storeTours, setStoreTours] = useState(
    newStoreTours.AttrationsData.filter(
      (item: RoomAttractionsProp, index: number) => {
        return (
          newStoreTours.AttrationsData.findIndex(
            (elem: RoomAttractionsProp) =>
              elem.AttractionId === item.AttractionId
          ) === index
        )
      }
    ).map((item: RoomAttractionsProp) => {
      item.Order = 0
      return item
    })
  )

  const [addTourModal, setAddTourModal] = useState(false)

  // =========拖拉參數=========
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // ============React Hook Form============
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<defaultValueProp>({ defaultValues })
  // ============表單ID============
  const formId = 'planning-tour-form'

  // =========useEffect=========
  // useEffect(() => {
  //   console.log('items', items)
  //   console.log('isDropped', isDropped)
  //   console.log('draggableState', draggableState)
  //   console.log('sortData', sortData)
  //   console.log('storeTours', storeTours)
  // }, [isDropped, draggableState, sortData, storeTours, items])

  useEffect(() => {
    const token = getCookie('auth')
    if (token === undefined) {
      setLoginConfirm(true)
      setTimeout(() => {
        router.push('/login')
      }, 2000)
      return
    }
  }, [])

  return (
    <>
      <Head>
        <title>Travel Maker | 共同規劃</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Group 340.png" />
      </Head>
      <div>
        <LoadingAnimate isLoading={isLoading} />
        {/* ======登入提醒====== */}
        <CustomModal
          modal={loginConfirm}
          setModal={setLoginConfirm}
          typeConfirm
          typeConfirmWarnIcon
          wrapper
          unClickable
          typeConfirmText={'請先登入，自動跳轉中...'}
          onConfirm={() => {
            router.push('/login')
          }}
        />
        {/* ======新增景點 的 搜尋大Modal====== */}
        <CustomModal
          wrapper
          top_50
          modal={addTourModal}
          setModal={setAddTourModal}
        >
          <button
            className="cursor-pointer p-2 absolute text-2xl top-2 right-2 z-1 text-primary"
            onClick={() => {
              setAddTourModal(false)
            }}
          >
            <BsXCircle />
          </button>
          <PlanningTourSearchModal
            hotAttrData={hotAttrData}
            storeTours={storeTours}
            setStoreTours={setStoreTours}
            setUnSaved={setUnSaved}
            setSuccessConfirmModal={setSuccessConfirmModal}
            setSuccessConfirmText={setSuccessConfirmText}
            setSuccessConfirmWarn={setSuccessConfirmWarn}
          />
        </CustomModal>
        {/* ======成功modal====== */}
        <CustomModal
          modal={successConfirmModal}
          setModal={setSuccessConfirmModal}
          typeConfirm
          typeConfirmWarnIcon={successConfirmWarn}
          overflowOpen
          typeConfirmText={successConfirmText}
          onConfirm={() => {
            setSuccessConfirmModal(false)
          }}
        />
        {/* ======拖拉主要邏輯====== */}
        <div className="container">
          <div className="block mt-4 lg:flex lg:space-x-6 lg:mb-20 md:mt-[80px]">
            <VoteDate data={originData} />
            <InvitePeople data={originData} />
          </div>
          {/* 中間拖拉 & 篩選區塊 */}
          <div className="flex flex-wrap mb-[200px] min-w-[1128px]">
            {/* 排行程 & 行程名稱 寬100% */}
            <PlanningTourTitle
              RoomName={data.RoomName}
              CreaterGuid={data.CreaterGuid}
              setSuccessConfirmWarn={setSuccessConfirmWarn}
              setSuccessConfirmModal={setSuccessConfirmModal}
              setSuccessConfirmText={setSuccessConfirmText}
              setIsLoading={setIsLoading}
            />
            {/* 篩選器及其按鈕 */}
            <div className="mr-6 max-w-[264px] hidden md:block">
              <SelectSide
                setIsLoading={setIsLoading}
                formId={formId}
                handleSubmit={handleSubmit}
                register={register}
                onSubmit={onSubmit}
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
            {/* 拖拉區 */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="flex-grow max-w-[840px]">
                {/* 排序1 max-lg為1280以下出現x軸 */}
                <div className="flex flex-wrap h-full lg:h-auto scrollbar-style max-lg:max-w-[396px] max-lg:overflow-x-scroll max-lg:mb-4">
                  {/* <Sortable /> */}
                  <SortableContext items={items} strategy={rectSortingStrategy}>
                    {items.map((id, index) => {
                      return (
                        <SortableItem key={id} id={id}>
                          {/* {id} */}
                          {Array(8)
                            .fill('')
                            .map((item, i) => {
                              if (id === i + 1) {
                                return (
                                  <DroppableBig key={i} id={id}>
                                    <div className="absolute z-[2] text-white top-1 left-1 w-5 h-5 bg-primary rounded-full flex justify-center items-center">
                                      {index + 1}
                                    </div>
                                    {isDropped[i] ? (
                                      <div>
                                        {/* 漸層工具列 */}
                                        <div className="group-hover:opacity-100 opacity-0 duration-300 absolute bg-gradient-to-b from-[#0F0B0B] to-[rgba(2, 0, 0, 0.25)] z-[1] w-full h-[33px]">
                                          {/* <div className="absolute bg-red-500/50 z-[1] w-full h-[33px]"> */}
                                          <button
                                            className="z-[50] absolute bg-[rgba(255,255,255,0.7)] rounded-full w-[20px] h-[20px] text-black text-xl top-1 right-1"
                                            onClick={() => {
                                              // ==設置未儲存State==
                                              setUnSaved(true)
                                              // ==設置不顯示此塊State==
                                              setIsDropped(() => {
                                                const newData = [...isDropped]
                                                newData[i] = false
                                                return newData
                                              })
                                              // ==設置排序資料==
                                              setSortData(
                                                sortData.filter(
                                                  (
                                                    item: RoomAttractionsProp
                                                  ) => {
                                                    return !(
                                                      item.Order ===
                                                      index + 1
                                                    )
                                                  }
                                                )
                                              )
                                            }}
                                          >
                                            <MdOutlineCancel />
                                          </button>
                                        </div>
                                        {draggableState[i]}
                                      </div>
                                    ) : null}
                                  </DroppableBig>
                                )
                              }
                            })}
                        </SortableItem>
                      )
                    })}
                  </SortableContext>
                </div>
                {/* tab切換區 */}
                <PlanningTourTab tabPos={tabPos} setTabPos={setTabPos} />
                {/* 根據tabPos判斷是 備用景點(拖拉) & 地圖 */}
                {
                  tabPos === '備用景點' ? (
                    <PlanningTourStoreTours
                      data={storeTours}
                      CreaterGuid={originData.CreaterGuid}
                      setAddTourModal={setAddTourModal}
                      setStoreTours={setStoreTours}
                      setUnSaved={setUnSaved}
                    />
                  ) : (
                    <TourMap data={sortData} />
                  ) //塞data
                }
                <button
                  className={`${
                    unSaved && '!bg-secondary hover:!bg-secondary/75'
                  } flex ml-auto text-xl bg-primary py-2 lg:py-3 px-6 lg:px-10 justify-end items-center rounded-md text-white hover:bg-primary/75 duration-100`}
                  onClick={handleSave}
                >
                  <MdSave className="text-lg mr-2" />
                  儲存
                </button>
              </div>
            </DndContext>
          </div>
          <div className="pb-[160px]">
            <MoreJourney moreData={moreData} />
          </div>
        </div>
      </div>
    </>
  )

  async function handleSave() {
    try {
      // ===確認token===
      const token = getCookie('auth')
      if (token === undefined) {
        setLoginConfirm(true)
        setTimeout(() => {
          router.push('/login')
        }, 2000)
        return
      }
      //===loading發 POST===
      setIsLoading(true)
      const AttrationsData = sortData.concat(storeTours)
      const RoomGuid = originData.RoomGuid
      const res = await postRoomTours(token, RoomGuid, AttrationsData)
      //===res.ok 取消loading===
      if (res.ok) {
        setIsLoading(false)
        setUnSaved(false)
        // const resJSON = await res.json()
        setSuccessConfirmWarn(false)
        setSuccessConfirmModal(true)
        setSuccessConfirmText('房間景點修改成功')
        return
      }
      //==throw Error===
      throw new Error('不知名錯誤')
    } catch (err) {
      console.error(err)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleDragEnd(e: any) {
    const { active, over } = e
    // ======進入拖拉取代判斷======
    if (
      over &&
      (over.id === 1 ||
        over.id === 2 ||
        over.id === 3 ||
        over.id === 4 ||
        over.id === 5 ||
        over.id === 6 ||
        over.id === 7 ||
        over.id === 8) &&
      active.id >= 51
      // (active.id === 51 ||
      //   active.id === 52 ||
      //   active.id === 53 ||
      //   active.id === 54 ||
      //   active.id === 55 ||
      //   active.id === 56 ||
      //   active.id === 57 ||
      //   active.id === 58)
    ) {
      // alert('觸發拖拉&取代')
      setUnSaved(true)

      const newIndex = items.indexOf(over.id) + 1
      const newObj = { ...storeTours[active.id - 51], Order: newIndex }

      // ===設置sortData===
      setSortData(() => {
        let newData = [...sortData]
        let isChanged = false

        newData.map((item, i) => {
          if (item.Order === newIndex) {
            newData[i] = newObj
            isChanged = true
            return item
          }
        })
        if (!isChanged) {
          newData = [...sortData, newObj]
        }

        return newData
      })

      // ===開啟isDropped===
      setIsDropped(() => {
        const newData = [...isDropped]
        newData[over.id - 1] = true
        return newData
      })

      // ===設置dragState===
      setDraggableState(() => {
        const newData = [...draggableState]
        newData[over.id - 1] = (
          <DragStateDIV item={storeTours[active.id - 51]} />
        )
        return newData
      })
    }

    // ======進入排序判斷======
    if (
      active.id !== over.id &&
      active.id < 51
      // active.id !== 51 &&
      // active.id !== 52 &&
      // active.id !== 53 &&
      // active.id !== 54 &&
      // active.id !== 55 &&
      // active.id !== 56 &&
      // active.id !== 57 &&
      // active.id !== 58
    ) {
      // alert('觸發排序')
      // ===設定重排順序===
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
      const oldIndex2 = items.indexOf(active.id) + 1
      const newIndex2 = items.indexOf(over.id) + 1

      // ===設定重排資料===
      const newData = [...sortData]
      newData.map((item) => {
        const didfrent = newIndex2 - oldIndex2
        if (item.Order === oldIndex2) {
          // ==有才開啟未儲存==
          setUnSaved(true)
          item.Order = newIndex2
          return item
        }
        if (didfrent && item.Order <= newIndex2 && item.Order >= oldIndex2) {
          // ==有才開啟未儲存==
          setUnSaved(true)
          // alert('進入-法')
          item.Order -= 1
          return item
        }
        if (didfrent < 0 && item.Order < oldIndex2 && item.Order >= newIndex2) {
          // ==有才開啟未儲存==
          setUnSaved(true)
          // alert('進入+法')
          item.Order += 1
          return item
        }
      })
      // ===設定重排資料2===
      setSortData(newData)
    }
  }

  async function onSubmit(data: defaultValueProp) {
    setIsLoading(true)
    try {
      // 缺geo,故先判斷鄰近值,在做函式返回newData
      const newData = await (data.nearBy
        ? handleNearBy(true)
        : handleNearBy(false))
      const res = await getRandomTours(newData)

      // ===res.ok===
      if (res.ok) {
        const resJSON = await res.json()
        //==設置state==
        setItems([1, 2, 3, 4, 5, 6, 7, 8])
        setSuccessConfirmWarn(false)

        setSuccessConfirmModal(true)
        setSuccessConfirmText('行程取得成功')
        setIsLoading(false)
        setUnSaved(true)

        // ======setIsDropped======
        setIsDropped(() => {
          const newData = Array(8)
            .fill('')
            .map((item, index) => {
              if (resJSON[index]) {
                return true
              }
              return false
            })
          return newData
        })

        // ======setSortData======
        setSortData(() => {
          const newData = resJSON.map(
            (item: RoomAttractionsProp, index: number) => {
              const obj = {
                AttractionId: item.AttractionId,
                UserGuid: user.UserGuid,
                AttractionName: item.AttractionName,
                ImageUrl: item.ImageUrl,
                Order: index + 1,
              }
              return obj
            }
          )
          return newData
        })

        // ======setDraggableState======
        setDraggableState(() => {
          const newResJSON = resJSON.map(
            (item: RoomAttractionsProp, index: number) => {
              const obj = {
                AttractionId: item.AttractionId,
                UserGuid: user.UserGuid,
                AttractionName: item.AttractionName,
                ImageUrl: item.ImageUrl,
                Order: index + 1,
              }
              return obj
            }
          )
          const newData = Array(8)
            .fill('')
            .map((item, index) => {
              if (newResJSON[index]) {
                return (
                  <DragStateDIV
                    key={newResJSON[index].Order}
                    item={newResJSON[index]}
                  />
                )
              } else {
                return <></>
              }
            })
          return newData
        })

        // !======改為不做怕備用景點過多 尚未完成 若景點id已在備用會導致兩個相同備用景點 異常======

        // ==隨機產生成功後移動到景點Slider處==
        window.scrollTo({
          top: 630,
          behavior: 'smooth',
        })

        return
      }
      throw new Error('錯誤,or沒找到景點')
    } catch (err) {
      setIsLoading(false)
      setSuccessConfirmModal(true)
      setSuccessConfirmWarn(true)
      setSuccessConfirmText('錯誤，無相鄰景點')
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
  // ========= RHF 錯誤捕捉 p.s alert記得關 =========
  function handleErrors(e: { preventDefault: () => void }) {
    // 判斷2個都為false時
    if (!watch('nearBy') && !watch('DistrictName').length) {
      setSuccessConfirmModal(true)
      setSuccessConfirmText('填寫不完整 (區域)')
      setSuccessConfirmWarn(true)
      e.preventDefault()
      return
    }
    if (Object.keys(errors).length) {
      setSuccessConfirmModal(true)
      setSuccessConfirmText('填寫不完整 (行程類別)')
      setSuccessConfirmWarn(true)
    }
  }
}

export async function getServerSideProps({
  params,
  res,
  req,
}: {
  params: paramsProp
  res: undefined
  req: undefined
}) {
  try {
    const { id } = params
    const token = getCookie('auth', { req, res })
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers.Authorization = `${token}`
    }

    const response = await fetch(
      `https://travelmaker.rocket-coding.com/api/rooms/${id}`,
      {
        headers: {
          Authorization: `${token ?? undefined}`,
        },
      }
    )
    const data = await response.json()
    // 以及知道這個連結的人會被加進來 (post token)

    //==景點get
    const resHotAttrData = await fetch(
      `https://travelmaker.rocket-coding.com/api/attractions/search?Page=1`,
      {
        method: 'GET',
        headers,
      }
    )
    const hotAttrData = await resHotAttrData.json()

    const resMore = await fetch(
      'https://travelmaker.rocket-coding.com/api/tours/hot/0'
    )

    const resMoreJSON = await resMore.json()

    if (response.ok && resMore.ok) {
      return {
        props: { data: data, hotAttrData: hotAttrData, moreData: resMoreJSON },
      }
    }
    throw new Error('不知名錯誤')
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    }
  }
}
