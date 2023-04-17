import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import CommentCard from '@/modules/MemberCenterPage/components/CommentCard'
import SeeMore from '@/common/components/SeeMore'
import { CommentDataProps, MemberCountProps } from '@/pages/member-center/types'
import { BsExclamationCircle } from 'react-icons/bs'
import { CustomModal } from '@/common/components/CustomModal'

export async function getServerSideProps({
  req,
  res,
}: {
  req: undefined
  res: undefined
}) {
  const token = getCookie('auth', { req, res })

  // 【API】取得我的景點評論
  const resCommentData = await fetch(
    `https://travelmaker.rocket-coding.com/api/users/comments/1`,
    {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const commentData = await resCommentData.json()

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
      commentData,
      memberCountData,
    },
  }
}

export default function Comment({
  commentData,
  memberCountData,
}: {
  commentData: CommentDataProps
  memberCountData: MemberCountProps
}) {
  // 將行程及房間數量往 MemberLayout 傳
  const [countData, setCountData] = useState(memberCountData)
  useEffect(() => {
    setCountData(countData)
  }, [countData])

  // 將評論資料往 CommentCard 傳
  const [editCommentData, setEditCommentData] = useState(
    commentData.CommentData
  )
  useEffect(() => {
    setEditCommentData(editCommentData)
  }, [editCommentData])

  // 判斷有無取得 cookie
  const user = getCookie('user') ? JSON.parse(String(getCookie('user'))) : null

  // 這邊避免使用三元運算會報出伺服器與本地 HTML 渲染不一致的問題
  // 可參考 https://nextjs.org/docs/messages/react-hydration-error
  const [userName, setUserName] = useState()
  useEffect(() => setUserName(user.UserName), [user])

  const [deleteConfirm, setDeleteConfirm] = useState(false)

  return (
    <div>
      {/* 手機版 */}
      <div className="container">
        <div className="md:hidden mt-8 mb-[100px] ">
          <h2 className="text-lg font-bold mb-7 md:mb-10">
            我的評論({memberCountData.AttCommentCounts})
          </h2>
          {/* 詳細資訊區 */}
          <div className="flex flex-col">
            <div className="flex flex-col space-y-6 md:space-y-10">
              {commentData?.CommentData.map((item) => {
                return (
                  <CommentCard
                    key={item.AttractionCommentId}
                    id={item.AttractionCommentId}
                    user={userName}
                    attraction={item.AttractionName}
                    comment={item.Comment}
                    time={item.InitDate}
                    star={item.Score}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/* 電腦版 */}
      {/* 刪除評論 */}
      <CustomModal modal={deleteConfirm} setModal={setDeleteConfirm} wrapper>
        <div className="w-[552px] pt-8 p-7 bg-white rounded-xl ">
          <div className="flex items-center space-x-2 mb-5">
            <BsExclamationCircle className="text-[32px] text-highlight" />
            <h4 className="text-xl">確定要刪除嗎？</h4>
          </div>
          <hr />
          <span className="p-8 block">刪除後將無法復原，是否確認刪除?</span>
          <div className="flex justify-end space-x-9">
            <button
              className="border border-primary text-primary text-xl px-9 py-3 font-bold rounded-md hover:border-primary-tint hover:text-primary-tint hover:duration-500"
              onClick={() => {
                setDeleteConfirm(!deleteConfirm)
              }}
            >
              取消
            </button>
            <button className="bg-primary border border-transparent text-white text-xl px-9 py-3 font-bold rounded-md hover:bg-primary-tint hover:duration-500">
              刪除
            </button>
          </div>
        </div>
      </CustomModal>

      <MemberLayout
        path="Comment"
        countData={countData}
        setCountData={setCountData}
      >
        <div className="md:flex md:flex-col md:space-y-7 md:w-2/3">
          {/* 分類資訊區 */}
          <div className="md:member-shadow md:rounded-md">
            <h2 className="md:text-xl md:px-10 md:py-8">我的評論</h2>
            <hr className="md:w-full md:border-gray-E2" />
            <div className="md:px-10 md:py-6">
              共有{commentData.AttCommentCounts}則評論
            </div>
          </div>
          {/* 詳細資訊區 */}
          <div>
            <div className="md:flex md:flex-col md:space-y-10  md:mb-[60px] lg:flex-row lg:flex-wrap">
              {commentData?.CommentData.map((item) => {
                return (
                  <CommentCard
                    key={item.AttractionCommentId}
                    id={item.AttractionCommentId}
                    user={userName}
                    attraction={item.AttractionName}
                    comment={item.Comment}
                    time={item.InitDate}
                    star={item.Score}
                    onClick={() => {
                      setDeleteConfirm(!deleteConfirm)
                    }}
                  />
                )
              })}
            </div>
            <SeeMore />
          </div>
        </div>
      </MemberLayout>
    </div>
  )
}
