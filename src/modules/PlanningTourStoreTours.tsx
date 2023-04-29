import { RoomAttractionsProp } from '@/util/types'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BsList } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'
import Draggable from './Dragable'
import Droppable from './Droppable'

export default function PlanningTourStoreTours({
  data,
  CreaterGuid,
  setAddTourModal,
  setStoreTours,
  setUnSaved,
}: {
  data: RoomAttractionsProp[]
  CreaterGuid: string
  setAddTourModal: React.Dispatch<boolean>
  setStoreTours: React.Dispatch<RoomAttractionsProp[]>
  setUnSaved: React.Dispatch<boolean>
}) {
  const user = getCookie('user')
    ? JSON.parse(String(getCookie('user')))
    : undefined

  const [userGuid, setUserGuid] = useState('')

  useEffect(() => {
    setUserGuid(user.UserGuid)
  }, [])

  return (
    <div className=" flex flex-wrap mb-12 py-5 px-7 /max-h-[312px] min-h-[312px] scrollbar-style /overflow-y-scroll z-[-1] rounded-md shadow-[1px_2px_12px_0px_rgba(0,0,0,0.25)]">
      {/* 取唯一一個id ！！！*/}
      {data.map((item, index) => {
        return (
          <Droppable id={index + 51} key={index + 51}>
            <Draggable id={index + 51}>
              <div
                key={item.AttractionId}
                className="w-[124px] h-[124px] cursor-default"
              >
                {userGuid === CreaterGuid || userGuid === item.UserGuid ? (
                  <MdOutlineCancel
                    className="absolute z-[1] text-white text-xl top-1 right-1 cursor-pointer"
                    onClick={() => {
                      setStoreTours(data.filter((item, i) => !(i === index)))
                      setUnSaved(true)
                    }}
                  />
                ) : null}
                <div className="absolute w-full text-white text-xl bottom-0 pb-1 left-[50%] -translate-x-[50%] z-10 hover:bg-white duration-200 group flex justify-center cursor-grab active:cursor-grabbing">
                  <BsList className="group-hover:text-black" />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(2, 0, 0, 0)] to-[#0F0B0B]"></div>

                <a
                  href={`/hot-topics/attractions/${item.AttractionId}`}
                  target="_blank"
                  className="w-[124px] px-1 h-[54px] line-clamp-2  absolute z-[1] top-1/2 text-center bottom-1 left-1/2 translate-x-[-50%] translate-y-[-20%] text-white  animate-pulse hover:underline hover:text-primary-tint active:text-primary  hover:!opacity-100"
                >
                  {item.AttractionName}
                </a>
                <Image
                  alt=""
                  src={item.ImageUrl}
                  width={124}
                  height={124}
                  className="object-cover w-full h-full"
                  priority
                  blurDataURL="/blurLogo.png"
                  placeholder="blur"
                />
                <div className="absolute bottom-0 w-[124px] h-[116px] bg-gradient-to-b from-[rgba(255,255,255,0.0)] to-black"></div>
              </div>
            </Draggable>
          </Droppable>
        )
      })}
      <button
        className="cursor-pointer w-1/4 max-w-[124px] max-h-[124px] relative shadow mr-10 mb-6 [&:nth-child(5)]:!mr-0 [&:nth-child(10)]:!mr-0 [&:nth-child(15)]:!mr-0 bg-[#f7f7f7]"
        onClick={() => {
          setAddTourModal(true)
        }}
      >
        <div className="w-[124px] h-[124px]">
          <div className="w-[52px] h-[52px] border border-dashed border-gray-A8 absolute top-1/2 text-center left-1/2 translate-x-[-50%] translate-y-[-50%]"></div>
          <div className="w-[124px] absolute top-1/2 text-center left-1/2 translate-x-[-50%] translate-y-[-50%] text-gray-A8">
            ＋
          </div>
        </div>
      </button>
    </div>
  )
}

// {data.map((item, index) => {
//   return (
//     <div
//       key={item.AttractionId}
//       className="w-1/4 max-w-[124px] h-[124px] relative shadow mr-10 mb-6 [&:nth-child(5)]:!mr-0 [&:nth-child(10)]:!mr-0 [&:nth-child(15)]:!mr-0"
//     >
//       <MdOutlineCancel className="absolute text-white text-xl top-1 right-1" />
//       <div className="absolute w-full text-white text-xl bottom-0 pb-1 left-[50%] -translate-x-[50%] z-10 hover:bg-white duration-200 group flex justify-center cursor-grab active:cursor-grabbing">
//         <BsList className="group-hover:text-black" />
//       </div>
//       <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(255,255,255,0.0)] to-black"></div>
//       <div className="absolute text-white top-1 left-1 w-5 h-5 bg-primary rounded-full flex justify-center items-center">
//         {item.Order}
//       </div>
//       <div className="w-[124px] absolute top-1/2 text-center bottom-1 left-1/2 translate-x-[-50%] text-white ">
//         {item.AttractionName}
//       </div>
//       <img
//         // alt=""
//         src={item.ImageUrl}
//         // width={652}
//         // height={180}
//         className="object-cover w-full h-full"
//         // priority
//         // blurDataURL="/blurLogo.png"
//         // placeholder="blur"
//       />

//       {/* <Image
//                 alt=""
//                 src={item.ImageUrl}
//                 width={652}
//                 height={180}
//                 className="object-cover w-full h-full"
//                 priority
//                 blurDataURL="/blurLogo.png"
//                 placeholder="blur"
//               /> */}
//     </div>
//   )
// })}
