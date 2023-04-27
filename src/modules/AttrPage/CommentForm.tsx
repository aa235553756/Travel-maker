import CustomStar from '@/common/components/CustomStar'
import { getAttractions, postAttrComment } from '@/util/attrApi'
import { AttrAroundsProp, CommentsProp } from '@/util/attrTypes'
import { CookieValueTypes, getCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

interface AttractionProp {
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

export default function CommentForm({
  setData,
  AttractionId,
  commentDIVRef,
}: {
  setData: React.Dispatch<AttractionProp>
  AttractionId: number
  commentDIVRef: React.RefObject<HTMLDivElement>
}) {
  const { query } = useRouter()

  const [token, setToken] = useState<CookieValueTypes | undefined>(undefined)
  const [commentStar, setCommentStar] = useState(0)
  const commetInputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setToken(getCookie('auth'))
  }, [])

  useEffect(() => {
    setCommentStar(0)
    if (commetInputRef.current?.value) {
      commetInputRef.current.value = ''
    }
  }, [query])

  return (
    <form className="">
      <div className="mx-auto lg:w-2/3">
        {token ? null : (
          <p className="mb-6">
            您尚未登入，亦可
            <Link
              href="/login"
              className="text-blue-400 underline visited:text-blue-600"
            >
              登入
            </Link>
            留言。
          </p>
        )}
        <div className="flex flex-col mb-[30px] md:mb-6 md:flex-row">
          <div>
            <p className="mb-4">評價星號：</p>
            <div className="md:pt-2">
              <CustomStar
                rating={commentStar}
                clickable={token ? true : false}
                starDimension={'30px'}
                setSomething={setCommentStar}
              />
            </div>
          </div>
        </div>
        <textarea
          ref={commetInputRef}
          disabled={token ? false : true}
          className="px-2 py-3 mb-5 block w-full min-h-[280px] resize-none bg-[#FAFAFA] md:mb-9 focus-visible:outline-secondary border"
          placeholder="請輸入評價內容"
        ></textarea>
        <button
          type="button"
          disabled={token ? false : true}
          className="py-2 px-8 lg:text-xl ml-auto block bg-primary rounded-md text-white disabled:bg-primary/50"
          onClick={handlePostComment}
        >
          送出
        </button>
      </div>
    </form>
  )
  async function handlePostComment() {
    if (commetInputRef?.current?.value === '') {
      return
    }
    try {
      if (token === undefined) {
        return
      }
      const res = await postAttrComment(
        String(token),
        AttractionId,
        commetInputRef,
        commentStar
      )
      if (res.ok) {
        const res = await getAttractions(AttractionId, token)
        const resJSON = await res.json()
        setData(resJSON)
        setCommentStar(0)
        if (commetInputRef.current?.value) {
          commetInputRef.current.value = ''
        }
        commentDIVRef.current?.scrollIntoView()
        return
      }

      throw new Error('不知名錯誤')
    } catch (err) {
      alert(err)
    }
  }
}
