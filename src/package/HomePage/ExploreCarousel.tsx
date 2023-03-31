import Marquee from 'react-fast-marquee'

export default function ExploreCarousel() {
  return (
    <>
      <Marquee speed={20} gradientWidth={50} play={false}>
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
  <img
    key={0}
    className="object-cover !w-[250px] !h-[376px] block rounded-md"
    src="https://www.travel.taipei/image/222058/?r=1637650550884"
    alt=""
  />,
  <img
    key={1}
    className="object-cover !w-[250px] !h-[376px] block rounded-md"
    src="https://www.travel.taipei/content/images/attractions/282180/1024x768_attractions-image--rznjhetiuoqnzoyqppjgw.jpg"
    alt=""
  />,
  <img
    key={2}
    className="object-cover !w-[250px] !h-[376px] block rounded-md"
    src="https://www.travel.taipei/content/images/attractions/282359/1024x768_attractions-image-fqzciehrqkgic0eigurzvg.jpg"
    alt=""
  />,
  <img
    key={3}
    className="object-cover !w-[250px] !h-[376px] block rounded-md"
    src="https://www.travel.taipei/content/images/attractions/64607/1024x768_attractions-image-jjmofe2wt0calhfnw2cfca.jpg"
    alt=""
  />,
  <img
    key={4}
    className="object-cover !w-[250px] !h-[376px] block rounded-md"
    src="https://www.travel.taipei/image/222058/?r=1637650550884"
    alt=""
  />,
  <img
    key={5}
    className="object-cover !w-[250px] !h-[376px] block rounded-md"
    src="https://www.travel.taipei/content/images/attractions/282180/1024x768_attractions-image--rznjhetiuoqnzoyqppjgw.jpg"
    alt=""
  />,
  <img
    key={6}
    className="object-cover !w-[250px] !h-[376px] block rounded-md"
    src="https://www.travel.taipei/content/images/attractions/282359/1024x768_attractions-image-fqzciehrqkgic0eigurzvg.jpg"
    alt=""
  />,
  <img
    key={7}
    className="object-cover !w-[250px] !h-[376px] block rounded-md"
    src="https://www.travel.taipei/content/images/attractions/64607/1024x768_attractions-image-jjmofe2wt0calhfnw2cfca.jpg"
    alt=""
  />,
]

// todo
// 這邊連結景點,及重新找旅遊網的圖
