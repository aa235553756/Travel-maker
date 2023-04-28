import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Slider from 'react-slick'

// 這個我先放到common可能會用到

export default function AttrImageContainer({
  ImageUrl,
}: {
  className?: string
  ImageUrl: string[]
}) {
  const { query } = useRouter()

  // =========Slider=========
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const sliderRef = useRef<Slider>(null)

  //======偵測每次換頁時slider回到第一張======
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0)
    }
  }, [query])

  return (
    <Slider
      {...settings}
      ref={sliderRef}
      className="rounded-md mb-10 min-h-[208px]"
    >
      {ImageUrl.map((item: string) => {
        return (
          <div key={item} className="md:aspect-[16/9] bg-black rounded-md">
            <Image
              width="1128"
              height="480"
              src={item}
              alt="圖片"
              className="object-contain h-full rounded-md"
              priority
              blurDataURL="/blurLogo.png"
            ></Image>
          </div>
        )
      })}
    </Slider>
  )
}
