import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

export default function ExploreCarousel() {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}" style="background-color: black"></span>`
    },
  }

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={24}
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>解決完reducer問題再處理</SwiperSlide>
        <SwiperSlide>解決完reducer問題再處理</SwiperSlide>
        <SwiperSlide>解決完reducer問題再處理</SwiperSlide>
      </Swiper>
    </>
  )
}
