// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Pagination } from 'swiper'
import { FaCameraRetro } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'
import {
  MdDirectionsRun,
  MdBarChart,
  MdDeck,
  MdLocalBar,
  MdAccountBalance,
  MdDirectionsBike,
  // MdOutlineCancel,
} from 'react-icons/md'
import 'swiper/css'
import 'swiper/css/pagination'

export default function ExploreCarousel() {
  // const pagination = {
  //   clickable: true,
  //   renderBullet: function (index, className) {
  //     return `<span class="${className}" style="background-color: black"></span>`
  //   },
  // }

  return (
    <>
      <form className="flex space-x-4 mb-4 overflow-scroll">
        <label
          htmlFor='all'
          className="py-4 border w-[calc((100%-112px)/8)] text-center bg-[#ccc] min-w-[72px]"
        // onClick={() => handleClickType('random')}
        // style={{
        //   backgroundColor: state.types.random ? '#ccc' : 'white',
        // }}
        >

          <MdDirectionsRun className="mb-2 mx-auto text-2xl" />
          <input type="radio" name="form" id="all" />
          <p className="text-sm">隨心所欲</p>
        </label>
        <label
          className="py-4 border w-[calc((100%-112px)/8)] text-center min-w-[72px]"
          onClick={() => handleClickType('city')}
        // style={{
        //   backgroundColor: state.types.city ? '#ccc' : 'white',
        // }}
        >
          <MdBarChart className="mb-2 mx-auto text-2xl" />
          <p className="text-sm">城市走走</p>
        </label>
        <label
          htmlFor='film'
          className="py-4 border w-[calc((100%-112px)/8)] text-center min-w-[72px] active:bg-[#ccc]"
        // onClick={() => handleClickType('photograph')}
        // style={{
        //   backgroundColor: state.types.photograph ? '#ccc' : 'white',
        // }}
        >
          <FaCameraRetro className="mb-2 mx-auto text-2xl" />
          {/* 這邊放input，ReacthookForm也可以watch他去判斷label內的值 */}
          <input type="radio" name="form" id="film" />
          <p className="text-sm">拍照聖地</p>
        </label>
        <label
          className="py-4 border w-[calc((100%-112px)/8)] text-center min-w-[72px]"
          onClick={() => handleClickType('relax')}
        // style={{
        //   backgroundColor: state.types.relax ? '#ccc' : 'white',
        // }}
        >
          <MdDeck className="mb-2 mx-auto text-2xl" />
          <p className="text-sm">放鬆療癒</p>
        </label>
        <label
          className="py-4 border w-[calc((100%-112px)/8)] text-center min-w-[72px]"
          onClick={() => handleClickType('night')}
        // style={{
        //   backgroundColor: state.types.night ? '#ccc' : 'white',
        // }}
        >
          <MdLocalBar className="mb-2 mx-auto text-2xl" />
          <p className="text-sm">夜間首選</p>
        </label>
        <label
          className="py-4 border w-[calc((100%-112px)/8)] text-center min-w-[72px]"
          onClick={() => handleClickType('artists')}
        // style={{
        //   backgroundColor: state.types.artists ? '#ccc' : 'white',
        // }}
        >
          <MdAccountBalance className="mb-2 mx-auto text-2xl" />
          <p className="text-sm">文藝青年</p>
        </label>
        <label
          className="py-4 border w-[calc((100%-112px)/8)] text-center min-w-[72px]"
          onClick={() => handleClickType('family')}
        // style={{
        //   backgroundColor: state.types.family ? '#ccc' : 'white',
        // }}
        >
          <HiUserGroup className="mb-2 mx-auto text-2xl" />
          <p className="text-sm">親子互動</p>
        </label>
        <label
          className="py-4 border w-[calc((100%-112px)/8)] text-center min-w-[72px]"
          onClick={() => handleClickType('adventure')}
        // style={{
        //   backgroundColor: state.types.adventure ? '#ccc' : 'white',
        // }}
        >
          <MdDirectionsBike className="mb-2 mx-auto text-2xl" />
          <p className="text-sm">冒險活潑</p>
        </label>
      </form>
      {/* <Swiper
        slidesPerView={3}
        spaceBetween={24}
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper overflow-scroll"
      >
        <SwiperSlide>解決完reducer問題再處理</SwiperSlide>
        <SwiperSlide>解決完reducer問題再處理</SwiperSlide>
        <SwiperSlide>解決完reducer問題再處理</SwiperSlide>        <SwiperSlide>解決完reducer問題再處理</SwiperSlide>
        <SwiperSlide>解決完reducer問題再處理</SwiperSlide>
        <SwiperSlide>解決完reducer問題再處理</SwiperSlide>        <SwiperSlide>解決完reducer問題再處理</SwiperSlide>
        <SwiperSlide>解決完reducer問題再處理</SwiperSlide>
        <SwiperSlide>解決完reducer問題再處理</SwiperSlide>
      </Swiper> */}
    </>
  )
}
