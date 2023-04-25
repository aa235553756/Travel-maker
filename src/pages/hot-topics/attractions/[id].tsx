import CustomLink from '@/modules/AttrPage/CustomLink'
import CommentForm from '@/modules/AttrPage/CommentForm'
import React from 'react'
import AttrImageContainer from '@/common/components/AttrImageContainer'
import AttrIntro from '@/modules/AttrPage/AttrIntro'
import OthersComment from '@/modules/AttrPage/OthersComment/index'
import AttrArounds from '@/modules/AttrPage/AttrArounds'
import InfoList from '@/modules/AttrPage/InfoList'

interface paramsProp {
  id: number
}
interface AttrAroundsProp {
  AttractionId: string
  ImageUrl: string
  AttractionName: string
  City: string
}
interface Attraction {
  AttractionData: {
    IsCollect: boolean
    AttractionId: number
    AttractionName: string
    Introduction: string
    Address: string
    Tel: string
    Email: string
    OfficialSite: string
    Facebook: string
    OpenTime: string
    ImageUrl: string[]
  }
  CommentData: {
    AverageScore: number
    Comments: CommentsProp[]
  }
  MoreAttractions: AttrAroundsProp[]
}

interface CommentsProp {
  AttractionCommentId: number
  ProfilePicture: string
  UserName: string
  Score: number
  InitDate: string
  Comment: string
}

// !不同token下會顯示不同UI，尚缺
// !修改評論and登入評論and取得更多評論and收藏按鈕and評論排序
// !圖片輪播
export default function AttractionsId({ data }: { data: Attraction }) {
  console.log(data)

  return (
    <div className="container pt-9 pb-[100px] md:pb-[160px]">
      <CustomLink AttractionName={data.AttractionData.AttractionName} />

      {/* 圖片 */}
      <div className="lg:w-2/3 mx-auto">
        <AttrImageContainer
          ImageUrl={data.AttractionData.ImageUrl}
          className="flex flex-col justify-center mb-10 relative min-w-full min-h-[208px] bg-black md:aspect-[16/9] rounded-md"
        />

        {/* 小資訊 */}
        <InfoList AttractionData={data.AttractionData} />

        {/* 景點介紹 */}
        <AttrIntro Introduction={data.AttractionData.Introduction} />

        {/* 圖片 */}
        <AttrImageContainer
          ImageUrl={data.AttractionData.ImageUrl}
          className="flex flex-col justify-center relative min-w-full min-h-[208px] bg-black md:aspect-[16/9] mb-[62px] md:mb-[68px] rounded-md"
        />
      </div>

      {/* 其他評論區 */}
      <div className="pb-[60px] border-b mb-10">
        <div className="lg:w-2/3 mx-auto ">
          <OthersComment CommentData={data.CommentData} />
        </div>
      </div>

      {/* 撰寫評論區 */}
      <div className="md:mb-[80px] pb-[72px] md:pb-120px md:border-b">
        <CommentForm />
      </div>
      {/* 周邊景點列表 */}

      <AttrArounds MoreAttractions={data.MoreAttractions} />
    </div>
  )
}

export async function getServerSideProps({ params }: { params: paramsProp }) {
  const { id } = params
  const res = await fetch(
    `https://travelmaker.rocket-coding.com/api/attractions/${id}`
    // 記得換token
  )
  const data = await res.json()
  return {
    props: { data },
  }
}
