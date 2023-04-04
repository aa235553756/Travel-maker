import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DeleteBtn from '../../../common/components/button/DeleteBtn'

export default function BlogDraftCard({
  showDelete,
  blogName,
  poster,
  time,
}: {
  showDelete: boolean
  blogName: string
  poster: string
  time: string
}) {
  return (
    <div className="border rounded-md relative">
      <div className="absolute top-5 right-5 flex space-x-2 z-5">
        {showDelete && (
          <DeleteBtn
            onClick={() => {
              alert('確定要刪除，刪除後將無法復原?')
            }}
          />
        )}
      </div>

      <Link href="../blog/view-blog/1">
        <div className="w-full">
          <Image
            src="https://www.travel.taipei/content/images/attractions/222058/1024x768_attractions-image-hbt3wz-7l0yeewd968btkw.jpg"
            alt="圖片"
            width={328}
            height={260}
            className="w-full min-h-[260px] rounded-t-md"
          ></Image>
        </div>
        <div className="p-4 flex flex-col space-y-3">
          <p className="text-lg">{blogName}</p>
          <div className="flex items-center space-x-3">
            <div className="flex item-center space-x-2">
              <Image
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                alt="圖片"
                width={20}
                height={20}
                className="rounded-full"
              ></Image>
              <span className="text-sm">{poster}</span>
            </div>
            <span className="text-sm">{time}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
