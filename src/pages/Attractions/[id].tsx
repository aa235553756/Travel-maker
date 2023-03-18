import CustomLink from './../../modules/AttrPage/CustomLink'
import CommentForm from './../../modules/AttrPage/CommentForm'
import React from 'react'
import AttrImageContainer from '@/common/components/AttrImageContainer'
import AttrIntro from '@/modules/AttrPage/AttrIntro'
import OthersComment from './../../modules/AttrPage/OthersComment/index'
import AttrArounds from '@/modules/AttrPage/AttrArounds'
import {
  infoAry,
  attractionInfo,
  attractionInfoScore,
  userName,
  userComment,
  attrArounds,
} from '@/util/attrData'
import InfoList from '@/modules/AttrPage/InfoList'

interface paramsProp {
  id: number
}

export async function getServerSideProps({ params }: { params: paramsProp }) {
  const { id } = params
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  const data = await res.json()
  return {
    props: { data },
  }
}

export default function AttractionsId({ data }: { data: { title: string } }) {
  console.log(data)

  return (
    <div className="container pt-9 pb-[100px] md:pb-[160px]">
      <CustomLink data={data} />

      {/* 圖片 */}
      <AttrImageContainer className="flex flex-col justify-center mb-10 relative min-w-full min-h-[208px] bg-[rgba(0,0,0,0.5)] md:aspect-[21/9]" />

      {/* 小資訊 */}
      <InfoList infoAry={infoAry} />

      {/* 景點介紹 */}
      <AttrIntro attractionInfo={attractionInfo} />

      {/* 圖片 */}
      <AttrImageContainer className="flex flex-col justify-center relative min-w-full min-h-[208px] bg-[rgba(0,0,0,0.5)] md:aspect-[21/9] mb-[62px] md:mb-[68px]" />

      {/* 其他評論區 */}
      <OthersComment
        attractionInfoScore={attractionInfoScore}
        userName={userName}
        userComment={userComment}
      />

      {/* 撰寫評論區 */}
      <CommentForm />

      {/* 周邊景點列表 */}
      <AttrArounds attrArounds={attrArounds} />
    </div>
  )
}
