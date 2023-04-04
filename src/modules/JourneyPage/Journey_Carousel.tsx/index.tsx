import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { BsListCheck } from 'react-icons/bs'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'

// import required modules
import { Grid, Pagination, A11y } from 'swiper'

import OpenFormBtn from '@/common/components/OpenFormBtn'
// import { useForm } from 'react-hook-form'

export default function App() {
  // const { register, watch } = useForm()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHidden, setIsHidden] = useState(true)

  return (
    // py-10，push時記得刪掉
    <div className="container py-10 h-[3000px]">
      <div className="flex flex-wrap">
        <form className="lg:w-[calc(25%-12px)] w-full md:mb-8 lg:mr-6 lg:mb-0">
          <h4 className="flex mb-4">
            <BsListCheck className="text-2xl mr-2" />
            排行程
          </h4>
          <div className="md:hidden flex space-x-4 mb-4 overflow-scroll md:overflow-auto">
            {/* <TypeLabel register={register} watch={watch} /> */}
          </div>
          <OpenFormBtn isHidden={isHidden} setIsHidden={setIsHidden} />
          {/* 規劃行程電腦表單 */}
          <div className="hidden md:block h-[580px] bg-gray-D9 min-w-[264px] mb-4">
            我是排行程表單
          </div>
          {/* 手機版送出 */}
          <button
            type="button"
            form="someForm"
            className="md:hidden py-2 bg-[#797979] w-full mb-[60px]"
          >
            開始規劃
          </button>
          {/* 電腦版送出 */}
          <button className="hidden md:block w-full py-4 bg-gray-73 text-white rounded-md">
            隨機產生行程
          </button>
        </form>
        <div className="lg:w-[calc(75%-12px)] w-full flex flex-col">
          <h4 className="font-bold mb-4">行程名稱：美食吃透透</h4>
          <div className="bg-gray-D9 flex flex-wrap mb-8">
            <div className="md:w-1/4 w-1/2 aspect-square border"></div>
            <div className="md:w-1/4 w-1/2 aspect-square border"></div>
            <div className="md:w-1/4 w-1/2 aspect-square border"></div>
            <div className="md:w-1/4 w-1/2 aspect-square border"></div>
          </div>
          <div className="bg-gray-73 h-full min-h-[485px]">我是地圖</div>
          <button>儲存</button>
        </div>
      </div>

      <Swiper
        slidesPerView={2}
        grid={{
          rows: 2,
          fill: 'row',
          // fill: 'row',
        }}
        spaceBetween={30}
        slidesPerGroup={2}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination, A11y]}
        className="mySwiper !hidden"
      >
        <SwiperSlide className="relative">
          1
          <img src="https://picsum.photos/id/1018/160/160" alt="slide 1" />
          <button className="absolute top-[50%] left-[calc(100%+15px)] translate-x-[-50%] text-2xl">
            +
          </button>
        </SwiperSlide>
        <SwiperSlide className="relative">
          2
          <img src="https://picsum.photos/id/1015/160/160" alt="slide 2" />
          <button className="absolute top-[50%] left-[calc(100%+15px)] translate-x-[-50%] text-2xl">
            +
          </button>
        </SwiperSlide>
        <SwiperSlide>
          3
          <img src="https://picsum.photos/id/1019/160/160" alt="slide 3" />
        </SwiperSlide>
        <SwiperSlide>
          4
          <img src="https://picsum.photos/id/1024/160/160" alt="slide 4" />
        </SwiperSlide>
        <SwiperSlide>
          5
          <img src="https://picsum.photos/id/1018/160/160" alt="slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          6
          <img src="https://picsum.photos/id/1015/160/160" alt="slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          7
          <img src="https://picsum.photos/id/1019/160/160" alt="slide 3" />
        </SwiperSlide>
        <SwiperSlide>
          8
          <img src="https://picsum.photos/id/1024/160/160" alt="slide 4" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
