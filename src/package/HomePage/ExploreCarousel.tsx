import Slider from 'react-slick'

export default function ExploreCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    variableWidth: true,
    pauseOnHover: false,
  }

  return (
    <>
      <Slider {...settings} className="">
        {imagesSlides.map((item, index) => {
          return (
            <div key={index} className="mr-5">
              {item}
            </div>
          )
        })}
      </Slider>
    </>
  )
}

const imagesSlides = [
  <img
    key={0}
    className="object-cover h-full bg-[#ccc] !w-[250px] !h-[376px] block"
    src="https://www.travel.taipei/image/222058/?r=1637650550884"
    alt=""
  />,
  <img
    key={1}
    className="object-cover h-full bg-[#ccc] !w-[250px] !h-[376px] block"
    src="https://www.travel.taipei/content/images/attractions/282180/1024x768_attractions-image--rznjhetiuoqnzoyqppjgw.jpg"
    alt=""
  />,
  <img
    key={2}
    className="object-cover h-full bg-[#ccc] !w-[250px] !h-[376px] block"
    src="https://www.travel.taipei/content/images/attractions/282359/1024x768_attractions-image-fqzciehrqkgic0eigurzvg.jpg"
    alt=""
  />,
  <img
    key={3}
    className="object-cover h-full bg-[#ccc] !w-[250px] !h-[376px] block"
    src="https://www.travel.taipei/content/images/attractions/64607/1024x768_attractions-image-jjmofe2wt0calhfnw2cfca.jpg"
    alt=""
  />,
  <img
    key={4}
    className="object-cover h-full bg-[#ccc] !w-[250px] !h-[376px] block"
    src="https://www.travel.taipei/image/222058/?r=1637650550884"
    alt=""
  />,
  <img
    key={5}
    className="object-cover h-full bg-[#ccc] !w-[250px] !h-[376px] block"
    src="https://www.travel.taipei/content/images/attractions/282180/1024x768_attractions-image--rznjhetiuoqnzoyqppjgw.jpg"
    alt=""
  />,
  <img
    key={6}
    className="object-cover h-full bg-[#ccc] !w-[250px] !h-[376px] block"
    src="https://www.travel.taipei/content/images/attractions/282359/1024x768_attractions-image-fqzciehrqkgic0eigurzvg.jpg"
    alt=""
  />,
  <img
    key={7}
    className="object-cover h-full bg-[#ccc] !w-[250px] !h-[376px] block"
    src="https://www.travel.taipei/content/images/attractions/64607/1024x768_attractions-image-jjmofe2wt0calhfnw2cfca.jpg"
    alt=""
  />,
]
