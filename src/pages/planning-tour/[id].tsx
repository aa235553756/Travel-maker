/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { defaultValueProp, RoomAttractionsProp } from '@/util/types'
import { useForm, SubmitHandler } from 'react-hook-form'
import { defaultValues } from '@/util/selectData'
// import { SortableItem } from "@/components/SoratbleItems";
import {
  DndContext,
  useDroppable,
  useDraggable,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SortableItem } from '@/modules/SoratbleItems'
import Draggable from '@/modules/Dragable'
import { BsList } from 'react-icons/bs'
import DroppableBig from '@/modules/DroppableBig'
import Image from 'next/image'
// import { getCookie } from 'cookies-next'

interface paramsProp {
  id: number
}

interface PlanningTour {
  AttrationsData: RoomAttractionsProp[]
  RoomName: string
}

export default function PlanningTour({
  data: originData,
}: {
  data: PlanningTour
}) {
  // 這是data
  console.log(originData)
  // 所有的order都會在拖拉底下
  // order包含1,2,3,4,5,6,7,8會在上面

  const [data, setData] = useState(originData)
  const [sortData, setSortData] = useState(originData)
  const [tabPos, setTabPos] = useState('備用景點')
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8])

  const [isDropped, setIsDropped] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ])
  const [draggableState, setDraggableState] = useState(
    data.AttrationsData.map((item) => {
      return (
        <div
          key={item.AttractionId}
          style={{
            width: '180px',
            height: '180px',
            position: 'relative',
            background: 'green',
          }}
        >
          <div className="h-full">
            <div className=" absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(255,255,255,0.0)] to-black"></div>

            <div className="absolute text-center min-w-[180px] max-w-[180px] bottom-1 left-1/2 translate-x-[-50%] text-white ">
              {item.AttractionName}
            </div>
            <Image
              alt=""
              src={item.ImageUrl}
              width={180}
              height={180}
              className="object-cover w-full h-full"
              priority
              blurDataURL="/Group 329.png"
              placeholder="blur"
            />
          </div>
        </div>
      )
    })
  )

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const { register, handleSubmit, setValue, watch } = useForm<defaultValueProp>(
    { defaultValues }
  )
  // 這邊打POST取得隨機行程
  const formId = 'planning-tour-form'
  const onSubmit: SubmitHandler<defaultValueProp> = (data) =>
    alert(JSON.stringify(data))

  return (
    <div>
      <div className="container">
        <div className="block mt-4 lg:flex lg:space-x-6 lg:mb-20 md:mt-[80px]">
          <VoteDate />
          <InvitePeople />
        </div>
        <button
          className="p-2 bg-primary"
          onClick={() => {
            alert(JSON.stringify(sortData.AttrationsData))
            alert(JSON.stringify(data.AttrationsData))
          }}
        >
          案我data
        </button>
        {/* 中間拖拉 & 篩選區塊 */}
        <div className="flex flex-wrap mb-[200px]">
          {/* 排行程 & 行程名稱 寬100% */}
          <PlanningTourTitle RoomName={data.RoomName} />
          {/* 篩選器及其按鈕 */}
          <div className="mr-6 max-w-[264px] hidden md:block">
            <SelectSide
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
                                  <div className="absolute z-10 text-white top-1 left-1 w-5 h-5 bg-primary rounded-full flex justify-center items-center">
                                    {index + 1}
                                  </div>
                                  {draggableState[i]}
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
                  <PlanningTourStoreTours data={data.AttrationsData} />
                ) : (
                  <TourMap />
                ) //塞data
              }
              <button
                className={`${
                  true && '!bg-secondary hover:!bg-secondary/75'
                } flex ml-auto text-xl bg-primary py-2 lg:py-3 px-6 lg:px-10 justify-end items-center rounded-md text-white hover:bg-secondary duration-100`}
                onClick={() => {
                  alert('儲存')
                }}
              >
                <MdSave className="text-lg mr-2" />
                儲存
              </button>
            </div>
          </DndContext>
        </div>
        <MoreJourney />
      </div>
    </div>
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleDragEnd(e: any) {
    const { active, over } = e
    alert(JSON.stringify(active))

    if (
      over &&
      (over.id === 1 || over.id === 2) &&
      (active.id === 51 || active.id === 52)
    ) {
      alert('觸發拖拉&取代')
      setSortData((prev) => {
        const newData = JSON.parse(JSON.stringify(sortData))
        newData.AttrationsData[over.id - 1] = {
          ...data.AttrationsData[active.id - 51],
        }
        newData.AttrationsData[over.id - 1].Order = over.id

        return newData
      })
      // Droppeds[over.id - 1](true)
      setIsDropped((prev) => {
        const newData = isDropped
        newData[over.id - 1] = true
        return newData
      })

      setDraggableState((prev) => {
        const newData = [...draggableState]
        newData[over.id - 1] = (
          <div
            style={{
              width: '180px',
              height: '180px',
              position: 'relative',
              background: 'green',
            }}
          >
            <div
              key={data.AttrationsData[active.id - 51].AttractionId}
              className="h-full"
            >
              <div className=" absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(255,255,255,0.0)] to-black"></div>

              <div className="absolute text-center min-w-[180px] max-w-[180px] bottom-1 left-1/2 translate-x-[-50%] text-white ">
                {data.AttrationsData[active.id - 51].AttractionName}
              </div>
              <Image
                alt=""
                src={data.AttrationsData[active.id - 51].ImageUrl}
                width={180}
                height={180}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )
        return newData
      })
    }

    if (active.id !== over.id && active.id !== 51 && active.id !== 52) {
      alert('觸發排序')
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
      setSortData((prev) => {
        const newData = JSON.parse(JSON.stringify(sortData))
        const temp = newData.AttrationsData[active.id - 1]
        newData.AttrationsData[active.id - 1] =
          newData.AttrationsData[over.id - 1]
        newData.AttrationsData[active.id - 1].Order = active.id
        newData.AttrationsData[over.id - 1] = temp
        newData.AttrationsData[over.id - 1].Order = over.id
        return newData
      })
    }
  }
}

export async function getServerSideProps({ params }: { params: paramsProp }) {
  try {
    const { id } = params

    const response = await fetch(
      `https://travelmaker.rocket-coding.com/api/rooms/${id}`
    )
    const data = await response.json()
    // 以及知道這個連結的人會被加進來 (post token)

    if (response.ok) {
      return {
        props: { data },
      }
    }
    throw new Error('不知名錯誤')
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }
}
