import Marquee from 'react-fast-marquee'
import Image from 'next/image'

export default function ExploreCarousel() {
  return (
    <>
      <Marquee speed={70} gradientWidth={20} play={true}>
        {imagesSlides.map((item, index) => {
          return (
            <a href="" key={index} className="mr-5 group relative rounded-md">
              <div className="absolute w-full h-full group-hover:backdrop-blur-sm group-hover:bg-[rgba(0,0,0,0.5)] rounded-md"></div>
              {item}
              <div className="hidden text-lg lg:text-xl text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] group-hover:block">
                AttrTitle
              </div>
            </a>
          )
        })}
      </Marquee>
    </>
  )
}

const imagesSlides = [
  <Image
    width={250}
    height={376}
    key={0}
    className="object-cover !w-[250px] !h-[376px] block rounded-md"
    src="/explore1.jpg"
    alt="圖片"
  ></Image>,
  <Image
    width={250}
    height={376}
    key={1}
    className="object-cover !w-[250px] !h-[376px] block rounded-md"
    src="/explore2.jpg"
    alt="圖片"
  ></Image>,
  <Image
    width={250}
    height={376}
    key={2}
    className="object-cover !w-[250px] !h-[376px] block rounded-md"
    src="/explore3.jpg"
    alt="圖片"
  ></Image>,
  <Image
    width={250}
    height={376}
    key={3}
    className="object-cover !w-[250px] !h-[376px] block rounded-md"
    src="/explore4.jpg"
    alt="圖片"
  ></Image>,
  <Image
    width={250}
    height={376}
    key={4}
    className="object-cover !w-[250px] !h-[376px] block rounded-md"
    src="/explore5.jpg"
    alt="圖片"
  ></Image>,
  <Image
    width={250}
    height={376}
    key={5}
    className="object-cover !w-[250px] !h-[376px] block rounded-md"
    src="/explore6.jpg"
    alt="圖片"
  ></Image>,
  <Image
    width={250}
    height={376}
    key={6}
    className="object-cover !w-[250px] !h-[376px] block rounded-md"
    src="/explore7.jpg"
    alt="圖片"
  ></Image>,
]

// todo
// 這邊連結景點,及重新找旅遊網的圖
