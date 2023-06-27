import React, { useState } from 'react'
import Image from 'next/image'
import EditBtn from '@/common/components/button/EditBtn'
import DeleteBtn from '@/common/components/button/DeleteBtn'
import MoreBtn from '@/common/components/button/MoreBtn'
import { getCookie } from 'cookies-next'
import { MdModeEdit } from 'react-icons/md'
import { BsExclamationCircle, BsTrash } from 'react-icons/bs'
import { CustomModal } from '@/common/components/CustomModal'

interface replyAryProps {
  IsMyComment: boolean
  BlogReplyId: number
  UserGuid: string
  UserName: string
  InitDate: string
  ProfilePicture: string
  Reply: string
}

export default function PostComment({
  blogCommentId,
  user,
  userImageUrl,
  userComment,
  userTime,
  isMyComment,
  replyAry,
  handleDelComment,
}: {
  blogCommentId: number
  user: string
  userImageUrl: string
  userComment: string
  userTime: string
  isMyComment: boolean
  replyAry: replyAryProps[]
  handleDelComment: (commentId: number) => void
}) {
  const token = getCookie('auth')

  // 留言
  const [commentValue, setCommentValue] = useState(userComment)

  // 編輯留言
  const [isEditComment, setIsEditComment] = useState(false)

  // 新增回覆
  const [reply, setReply] = useState(replyAry || [])
  const [replyValue, setReplyValue] = useState('')
  const [isReply, setIsReply] = useState(false)
  const handleAddReply = async () => {
    try {
      //【API】新增回覆
      const resAddReplyData = await fetch(
        `https://travelmaker.rocket-coding.com/api/blogs/replies/add`,
        {
          method: 'POST',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            BlogCommentId: blogCommentId,
            Reply: replyValue,
          }),
        }
      )
      const addReplyData = await resAddReplyData.json()

      if (resAddReplyData.ok) {
        setReply((prevComments) => [...(prevComments || []), addReplyData])
      }

      if (!resAddReplyData.ok) {
        alert(addReplyData.Message)
      }
      throw new Error('不知名錯誤')
    } catch (error) {}
  }

  // 編輯回覆
  const replyValues = replyAry?.map((item) => item.Reply)
  const [editReplyValue, setEditReplyValue] = useState(
    replyValues || reply?.map(() => '')
  )
  const [isEditReply, setIsEditReply] = useState(
    Array(replyAry?.length).fill(false)
  )

  // 刪除回覆
  const [deleteReplyConfirm, setDeleteReplyConfirm] = useState(false)
  const [replyToDelete, setReplyToDelete] = useState<number | null>(null)
  const handleDelReply = async (replyId: number | null) => {
    try {
      //【API】刪除回覆
      const resDelReplyData = await fetch(
        `https://travelmaker.rocket-coding.com/api/blogs/replies/${replyId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const delReplyData = await resDelReplyData.json()

      if (resDelReplyData.ok) {
        const updatedReplies = reply.filter(
          (item) => item.BlogReplyId !== replyId
        )
        setReply(updatedReplies)
      }
      if (!resDelReplyData.ok) {
        alert(delReplyData.Message)
      }
      throw new Error('不知名錯誤')
    } catch (error) {}
  }

  // 手機版 - 更多按鈕
  const [moreBtn, setMoreBtn] = useState(false)

  console.log(reply)

  return (
    <div>
      <div className="flex flex-col space-y-6">
        <div className="shadow-[1px_1px_15px_0px_rgba(0,0,0,0.08)] rounded-md px-5 py-4 w-full relative">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              {/* 頭貼 */}
              <Image
                src={userImageUrl !== '' ? userImageUrl : '/userDefault.png'}
                alt="圖片"
                width={40}
                height={40}
                className="rounded-full min-h-[40px]"
              ></Image>

              {/* 留言 */}
              <div className="flex flex-col text-sm">
                <div className="flex space-x-5">
                  <p>{user}</p>
                  <a
                    className="font-bold cursor-pointer text-gray-73 hover:text-gray-A8 hover:duration-300"
                    onClick={() => {
                      setIsReply(true)
                    }}
                  >
                    回覆
                  </a>
                  {/* {isMyComment && (
                    <a
                      className="font-bold cursor-pointer text-gray-73 hover:text-gray-A8 hover:duration-300"
                      onClick={() => {
                        setIsReply(true)
                      }}
                    >
                      回覆
                    </a>
                  )} */}
                </div>
                <p className="text-gray-A8">{userTime}</p>
              </div>
            </div>

            {/* 留言編輯 & 刪除按鈕 */}
            {isMyComment && (
              <div className="hidden md:flex md:space-x-5">
                <div className="border border-primary rounded-full hover:bg-primary-tint hover:duration-500">
                  <EditBtn
                    onClick={() => {
                      setIsEditComment(true)
                    }}
                  />
                </div>
                <div className="border border-primary rounded-full hover:bg-primary-tint hover:duration-500">
                  <DeleteBtn
                    onClick={() => {
                      handleDelComment(blogCommentId)
                    }}
                  />
                </div>
              </div>
            )}

            {/* 更多按鈕 */}
            <div className="md:hidden">
              <MoreBtn
                onClick={() => {
                  setMoreBtn(!moreBtn)
                }}
              />
            </div>

            {/* 按更多顯示編輯&刪除 */}
            {moreBtn && (
              <div className="w-[120px] bg-white shadow-[4px_4px_8px_4px_rgba(0,0,0,0.1)] rounded-md py-4 absolute top-[56px] right-5">
                <button
                  type="button"
                  className="w-full block mx-auto py-2 text-primary hover:bg-primary hover:text-white"
                  onClick={() => {
                    setIsEditComment(true)
                    setMoreBtn(!moreBtn)
                  }}
                >
                  編輯
                </button>
                <button
                  type="button"
                  className="w-full block mx-auto py-2 text-primary hover:bg-primary hover:text-white"
                  onClick={() => {
                    handleDelComment(blogCommentId)
                    setMoreBtn(!moreBtn)
                  }}
                >
                  刪除
                </button>
              </div>
            )}
          </div>

          {/* 編輯留言 */}
          {isEditComment ? (
            <div className=" pl-[48px]">
              <textarea
                id="comment"
                name="comment"
                rows={3}
                cols={70}
                className="input-style resize-none w-full mt-2"
                value={commentValue}
                onChange={(e) => {
                  setCommentValue(e.target.value)
                }}
              ></textarea>
              <button
                className="bg-primary text-white block w-full py-3 rounded-md mt-2 mb-4 hover:bg-primary-tint hover:duration-500"
                onClick={async () => {
                  setIsEditComment(false)
                  // 【API】編輯留言
                  fetch(
                    `https://travelmaker.rocket-coding.com/api/blogs/comments/edit`,
                    {
                      method: 'PUT',
                      headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        BlogCommentId: blogCommentId,
                        Comment: commentValue,
                      }),
                    }
                  )
                  setCommentValue(commentValue)
                }}
              >
                儲存
              </button>
            </div>
          ) : (
            <div className="pl-[48px] mb-4">{commentValue}</div>
          )}

          {/* 回覆 */}
          <div className="flex-col space-y-5">
            {reply?.map((item, index) => {
              return (
                <div
                  className="flex items-center space-x-2 pl-12"
                  key={item.BlogReplyId}
                  id={item.BlogReplyId.toString()}
                >
                  <Image
                    src={item.ProfilePicture !== '' ? item.ProfilePicture : '/userDefault.png'}
                    alt="圖片"
                    width={40}
                    height={40}
                    className="rounded-full min-h-[40px]"
                  ></Image>

                  <div className="text-sm w-full">
                    <div className="flex space-x-5">
                      <span>{item.UserName}</span>
                      <span className="text-gray-A8 flex-grow">
                        {item.InitDate}
                      </span>
                      {item.IsMyComment && (
                        <div className="flex items-center space-x-3">
                          <div>
                            <MdModeEdit
                              className="text-gray-A8 cursor-pointer hover:text-gray-73"
                              onClick={() => {
                                setIsEditReply((prevState) => {
                                  const updatedState = [...prevState]
                                  updatedState[index] = true
                                  return updatedState
                                })
                              }}
                            />
                          </div>
                          <div>
                            <BsTrash
                              className="text-gray-A8 cursor-pointer hover:text-gray-73"
                              onClick={() => {
                                setReplyToDelete(item.BlogReplyId)
                                setDeleteReplyConfirm(true)
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 刪除回覆 */}
                    <CustomModal
                      modal={deleteReplyConfirm}
                      setModal={setDeleteReplyConfirm}
                      wrapper
                    >
                      <div className="w-[552px] pt-8 p-7 bg-white rounded-xl">
                        <div className="flex items-center space-x-2 mb-5">
                          <BsExclamationCircle className="text-[32px] text-highlight" />
                          <h4 className="text-xl">確定要刪除嗎？</h4>
                        </div>
                        <hr />
                        <span className="p-8 block">
                          刪除後將無法復原，是否確認刪除?
                        </span>
                        <div className="flex justify-end space-x-9">
                          <button
                            className="border border-primary text-primary text-xl px-9 py-3 font-bold rounded-md hover:border-primary-tint hover:text-primary-tint hover:duration-500"
                            onClick={() => {
                              setDeleteReplyConfirm(!deleteReplyConfirm)
                            }}
                          >
                            取消
                          </button>
                          <button
                            className="bg-primary border border-transparent text-white text-xl px-9 py-3 font-bold rounded-md hover:bg-primary-tint hover:duration-500"
                            onClick={() => {
                              if (replyToDelete) {
                                handleDelReply(replyToDelete)
                                setDeleteReplyConfirm(false)
                              }
                            }}
                          >
                            刪除
                          </button>
                        </div>
                      </div>
                    </CustomModal>

                    {/* 編輯回覆留言 */}
                    {isEditReply[index] ? (
                      <div>
                        <textarea
                          id="reply"
                          name="reply"
                          rows={3}
                          cols={70}
                          className="input-style resize-none w-full mt-2"
                          value={editReplyValue[index]}
                          onChange={(e) => {
                            const updatedValues = [...editReplyValue]
                            updatedValues[index] = e.target.value
                            setEditReplyValue(updatedValues)
                          }}
                        ></textarea>
                        <button
                          className="bg-primary text-white block w-full py-3 rounded-md mt-2 mb-4 hover:bg-primary-tint hover:duration-500"
                          onClick={async () => {
                            setIsEditReply((prevState) => {
                              const updatedState = [...prevState]
                              updatedState[index] = false
                              return updatedState
                            })

                            const res = await fetch(
                              `https://travelmaker.rocket-coding.com/api/blogs/replies/edit`,
                              {
                                method: 'PUT',
                                headers: {
                                  Authorization: `${token}`,
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  BlogReplyId: item.BlogReplyId,
                                  Reply: editReplyValue[index],
                                }),
                              }
                            )
                            if (res.ok) {
                              setEditReplyValue((prevState) => {
                                const updatedState = [...prevState]
                                if (replyAry) {
                                  replyAry[index].Reply = editReplyValue[index]
                                }
                                updatedState[index] = editReplyValue[index]
                                return updatedState
                              })
                            }
                          }}
                        >
                          儲存
                        </button>
                      </div>
                    ) : (
                      <p>{item.Reply}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* 回覆留言 */}
          {isReply && (
            <div className="mt-6 pl-[48px]">
              <textarea
                id="addComment"
                name="addComment"
                rows={3}
                cols={70}
                value={replyValue}
                onChange={(e) => {
                  setReplyValue(e.target.value)
                }}
                className="input-style resize-none w-full mt-2"
              ></textarea>
              <div className="flex space-x-2">
                <button
                  className="border-transparent bg-primary text-white block w-1/2 py-3 rounded-md mt-2 mb-4 hover:bg-primary-tint hover:duration-500"
                  onClick={async () => {
                    await handleAddReply()
                    setIsReply(false)
                    setReplyValue('')
                  }}
                >
                  送出
                </button>

                <button
                  className="border border-gray-A8 bg-white text-gray-A8 block w-1/2 py-3 rounded-md mt-2 mb-4 hover:bg-gray-F3 hover:duration-500"
                  onClick={() => {
                    setIsReply(false)
                  }}
                >
                  取消
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
