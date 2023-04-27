import CommentForm from '@/modules/AttrPage/CommentForm'
import React, { useEffect, useRef, useState } from 'react'
import AttrImageContainer from '@/common/components/AttrImageContainer'
import AttrIntro from '@/modules/AttrPage/AttrIntro'
import OthersComment from '@/modules/AttrPage/OthersComment/index'
import AttrArounds from '@/modules/AttrPage/AttrArounds'
import InfoList from '@/modules/AttrPage/InfoList'
import { getCookie } from 'cookies-next'
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md'
import { changeCollectApi, getAttractions } from '@/util/attrApi'
import { CustomModal } from '@/common/components/CustomModal'
import { BsBookmarkCheck, BsBookmarkX } from 'react-icons/bs'
import CustomLink from '@/modules/AttrPage/CustomLink'
import { Attraction, paramsProp } from '@/util/attrTypes'
import { useRouter } from 'next/router'

export default function AttractionsId({
  data: originData,
}: {
  data: Attraction
}) {
  console.log(originData)

  const router = useRouter()
  const { query } = useRouter()
  const [token, setToken] = useState('')

  const [data, setData] = useState(originData)

  const newImageUrl = [...data.AttractionData.ImageUrl].filter(
    (item, index) => {
      return index !== 1
    }
  )
  const [isCollect, setIsCollect] = useState(data.AttractionData.IsCollect)
  const [collectDisabled, setCollectDisabled] = useState(false)
  const [collectModal, setCollectModal] = useState(false)
  const [collectModalText, setCollectModalText] = useState('')
  const commentDIVRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setToken(String(getCookie('auth')))
  }, [])

  useEffect(() => {
    setData(originData)
  }, [query])

  useEffect(() => {
    setIsCollect(data.AttractionData.IsCollect)
  }, [data])

  return (
    <div className="container pt-9 pb-[100px] md:pb-[160px]">
      {/* 景點收藏成功提醒 Modal */}
      <CustomModal modal={collectModal} setModal={setCollectModal} wrapper>
        <div className="w-[408px] h-[288px] bg-white flex flex-col justify-center items-center space-y-6 rounded-xl">
          {isCollect ? (
            <BsBookmarkCheck className="text-[64px] text-[#74c041]" />
          ) : (
            <BsBookmarkX className="text-[64px] text-highlight" />
          )}
          <p className="text-2xl">{collectModalText}</p>
        </div>
      </CustomModal>

      <CustomLink AttractionName={data.AttractionData.AttractionName} />

      {/* 圖片 */}
      <div className="lg:w-2/3 mx-auto relative">
        <div className="absolute top-4 right-4 z-10">
          <button
            disabled={collectDisabled}
            type="button"
            className="bg-glass text-primary rounded-full p-2 w-[36px] h-[36px] z-20"
            onClick={async () => {
              setCollectDisabled(true)
              isCollect ? handleCollect('DELETE') : handleCollect('POST')
            }}
          >
            {isCollect ? (
              <MdBookmark className="text-primary text-xl" />
            ) : (
              <MdBookmarkBorder className="text-xl" />
            )}
          </button>
        </div>
        <AttrImageContainer
          ImageUrl={newImageUrl}
          className="flex flex-col justify-center mb-10 relative min-w-full min-h-[208px] bg-black md:aspect-[16/9] rounded-md"
        />

        {/* 小資訊 */}
        <InfoList AttractionData={data.AttractionData} />

        {/* 景點介紹 */}
        <AttrIntro Introduction={data.AttractionData.Introduction} />

        {/* 圖片 */}
        {data.AttractionData.ImageUrl.length === 1 ? null : (
          <AttrImageContainer
            ImageUrl={[data.AttractionData.ImageUrl[1]]}
            className="flex flex-col justify-center relative min-w-full min-h-[208px] bg-black md:aspect-[16/9] mb-[62px] md:mb-[68px] rounded-md"
          />
        )}
      </div>

      {/* 其他評論區 */}
      <div className="pb-[60px] border-b mb-10" ref={commentDIVRef}>
        <div className="lg:w-2/3 mx-auto ">
          <OthersComment
            CommentData={data.CommentData}
            AttractionId={data.AttractionData.AttractionId}
          />
        </div>
      </div>

      {/* 撰寫評論區 */}
      <div className="md:mb-[80px] pb-[72px] md:pb-120px md:border-b">
        <CommentForm
          setData={setData}
          AttractionId={data.AttractionData.AttractionId}
          commentDIVRef={commentDIVRef}
        />
      </div>
      {/* 周邊景點列表 */}

      <AttrArounds MoreAttractions={data.MoreAttractions} />
    </div>
  )
  async function handleCollect(method: string) {
    try {
      const res = await changeCollectApi(
        data.AttractionData.AttractionId,
        method,
        token,
        isCollect
      )

      //==res ok==
      if (res.ok) {
        setCollectModal(true)
        setIsCollect(!isCollect)
        setCollectModal(true)
        setCollectModalText(method === 'POST' ? '收藏景點成功' : '取消收藏景點')
        return
      }

      //==else throw error==
      throw new Error('不知名錯誤')
    } catch (err) {
      router.push('/login')
    } finally {
      setCollectDisabled(false)
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
  const { id } = params
  const token = getCookie('auth', { res, req })
  const response = await getAttractions(id, token ? token : null)
  const data = await response.json()
  return {
    props: { data },
  }
}
