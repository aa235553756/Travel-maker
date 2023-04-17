import { RoomAttractionsProp } from '@/util/types'
import React from 'react'
import { BsList } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'
import Draggable from './Dragable'
import Droppable from './Droppable'

export default function PlanningTourStoreTours({
  data,
}: {
  data: RoomAttractionsProp[]
}) {
  const draggableMarkup1 = (
    <Draggable id={51}>
      <div key={data[0].AttractionId} className=" h-[124px]">
        <MdOutlineCancel className="absolute text-white text-xl top-1 right-1" />
        <div className="absolute w-full text-white text-xl bottom-0 pb-1 left-[50%] -translate-x-[50%] z-10 hover:bg-white duration-200 group flex justify-center cursor-grab active:cursor-grabbing">
          <BsList className="group-hover:text-black" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(255,255,255,0.0)] to-black"></div>
        <div className="absolute text-white top-1 left-1 w-5 h-5 bg-primary rounded-full flex justify-center items-center">
          {data[0].Order}
        </div>
        <div className="w-[124px] absolute top-1/2 text-center bottom-1 left-1/2 translate-x-[-50%] text-white ">
          {data[0].AttractionName}
        </div>
        <img
          // alt=""
          src={data[0].ImageUrl}
          // width={652}
          // height={180}
          className="object-cover w-full h-full"
          // priority
          // blurDataURL="/Group 329.png"
          // placeholder="blur"
        />

        {/* <Image
                      alt=""
                      src={item.ImageUrl}
                      width={652}
                      height={180}
                      className="object-cover w-full h-full"
                      priority
                      blurDataURL="/Group 329.png"
                      placeholder="blur"
                    /> */}
      </div>
    </Draggable>
  )
  const draggableMarkup2 = (
    <Draggable id={52}>
      <div key={data[1].AttractionId} className=" h-[124px]">
        <MdOutlineCancel className="absolute text-white text-xl top-1 right-1" />
        <div className="absolute w-full text-white text-xl bottom-0 pb-1 left-[50%] -translate-x-[50%] z-10 hover:bg-white duration-200 group flex justify-center cursor-grab active:cursor-grabbing">
          <BsList className="group-hover:text-black" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(255,255,255,0.0)] to-black"></div>
        <div className="absolute text-white top-1 left-1 w-5 h-5 bg-primary rounded-full flex justify-center items-center">
          {data[1].Order}
        </div>
        <div className="w-[124px] absolute top-1/2 text-center bottom-1 left-1/2 translate-x-[-50%] text-white ">
          {data[1].AttractionName}
        </div>
        <img
          // alt=""
          src={data[1].ImageUrl}
          // width={652}
          // height={180}
          className="object-cover w-full h-full"
          // priority
          // blurDataURL="/Group 329.png"
          // placeholder="blur"
        />

        {/* <Image
                      alt=""
                      src={item.ImageUrl}
                      width={652}
                      height={180}
                      className="object-cover w-full h-full"
                      priority
                      blurDataURL="/Group 329.png"
                      placeholder="blur"
                    /> */}
      </div>
    </Draggable>
  )

  return (
    <div className="flex flex-wrap mb-12 py-5 px-7 max-h-[312px] min-h-[312px] scrollbar-style overflow-y-scroll bg-gray-D9">
      <Droppable id={51}>{draggableMarkup1}</Droppable>
      <Droppable id={52}>{draggableMarkup2}</Droppable>
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
//         // blurDataURL="/Group 329.png"
//         // placeholder="blur"
//       />

//       {/* <Image
//                 alt=""
//                 src={item.ImageUrl}
//                 width={652}
//                 height={180}
//                 className="object-cover w-full h-full"
//                 priority
//                 blurDataURL="/Group 329.png"
//                 placeholder="blur"
//               /> */}
//     </div>
//   )
// })}
