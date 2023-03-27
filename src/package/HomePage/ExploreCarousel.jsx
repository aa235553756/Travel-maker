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
  const imagesSlides = [
    '圖片1',
    '圖片2',
    '圖片3',
    '圖片4',
    '圖片5',
    '圖片6',
    '圖片7',
    '圖片8',
  ]

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={24}
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper !z-0"
      >
        {imagesSlides.map((imagesSlide, index) => (
          <SwiperSlide
            key={imagesSlide}
            virtualIndex={index}
            className="bg-[#ccc] !w-[250px] !h-[376px]"
          >
            {imagesSlide}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
