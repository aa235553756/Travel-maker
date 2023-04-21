import PlanningTourStoreTours from './../../modules/PlanningTourStoreTours'
import TourMap from './../../modules/TourMap'
import PlanningTourTab from './../../modules/PlanningTourTab'
import PlanningTourTitle from './../../modules/PlanningTourTitle'
import React, { useState } from 'react'
import VoteDate from '@/modules/JourneyPage/VoteDate'
import InvitePeople from '@/modules/JourneyPage/InvitePeople'
import MoreJourney from '@/modules/JourneyPage/MoreJourney'
import SelectSide from '@/modules/JourneyPage/SelectSide'
import Sortable from '@/common/components/Sortable'
import { MdSave } from 'react-icons/md'
import { defaultValueProp, RoomAttractionsProp } from '@/util/types'
import { useForm, SubmitHandler } from 'react-hook-form'
import { defaultValues } from '@/util/selectData'
import { getCookie } from 'cookies-next'
// import { getCookie } from 'cookies-next'

interface VoteDatesProp {
  VoteDateId: number
  Date: string
  Count: number
  IsVoted: boolean
  UserGuid?: string
}

interface paramsProp {
  id: number
}

interface PlanningTour {
  AttrationsData: RoomAttractionsProp
  RoomName: string
  VoteDates: VoteDatesProp[]
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

  const [data] = useState(originData)
  const [tabPos, setTabPos] = useState('備用景點')
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
          <VoteDate data={originData} />
          <InvitePeople data={originData} />
        </div>
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
          {/* 拖拉 */}
          <div className="flex-grow max-w-[840px]">
            {/* 排序1 max-lg為1280以下出現x軸 */}
            <div className="mb-6 h-full lg:h-auto scrollbar-style max-lg:max-w-[396px] max-lg:overflow-x-scroll max-lg:mb-4">
              <Sortable />
            </div>
            {/* tab切換區 */}
            <PlanningTourTab tabPos={tabPos} setTabPos={setTabPos} />
            {/* 根據tabPos判斷是 備用景點(拖拉) & 地圖 */}
            {
              tabPos === '備用景點' ? <PlanningTourStoreTours /> : <TourMap /> //塞data
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
        </div>
        <MoreJourney />
      </div>
    </div>
  )
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
