import { GetServerSideProps } from 'next'
import Journey from '@/pages/member-center/tour'
import { getCookie } from 'cookies-next'
import {
  TourDataProps,
  RoomDataProps,
  MemberCountProps,
} from '@/pages/member-center/types'

interface Props {
  tourData: TourDataProps
  roomData: RoomDataProps
  memberCountData: MemberCountProps
}

export default function Page(props: Props) {
  const { tourData, roomData, memberCountData } = props

  return (
    <div>
      <Journey
        tourData={tourData}
        roomData={roomData}
        memberCountData={memberCountData}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { params } = context
  const page = params?.page ?? '1'
  const token = getCookie('auth', context)

  // 【API】取得我的收藏行程
  const resTourData = await fetch(
    `https://travelmaker.rocket-coding.com/api/users/tours/${page}`,
    {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const tourData = await resTourData.json()

  // 【API】取得我的收藏房間
  const resRoomData = await fetch(
    `https://travelmaker.rocket-coding.com/api/users/rooms/${page}`,
    {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const roomData = await resRoomData.json()

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
      tourData,
      roomData,
      memberCountData,
    },
  }
}
